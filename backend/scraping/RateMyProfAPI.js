const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const Professor = require('../models/Professor'); // Ensure this path is correct

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://williamschristopher1204:xtsZYxxq0g2wGjwo@profquest.nfije.mongodb.net/?retryWrites=true&w=majority&appName=ProfQuest', {
  serverSelectionTimeoutMS: 30000,
});

class RateMyProfApi {
  constructor(schoolId = '1100') {
    this.schoolId = schoolId;
    this.professors = [];
  }

  async initBrowser() {
    this.browser = await puppeteer.launch({ headless: true });
  }

  async closeBrowser() {
    await this.browser.close();
  }

  async scrapeProfessorList() {
    await this.initBrowser();
    const page = await this.browser.newPage();
    let pageIndex = 1;
    let hasMore = true;

    while (hasMore) {
      const url = `https://www.ratemyprofessors.com/filter/professor/?&page=${pageIndex}&filter=teacherlastname_sort_s+asc&query=*%3A*&queryoption=TEACHER&queryBy=schoolId&sid=${this.schoolId}`;
      await page.goto(url, { waitUntil: 'load' });

      // Get JSON data from the page
      const jsonResponse = await page.evaluate(() => JSON.parse(document.body.innerText));

      for (const prof of jsonResponse.professors) {
        const professorData = {
          name: `${prof.tFname} ${prof.tLname}`,
          department: prof.tDept,
          rating: parseFloat(prof.overall_rating) || 0,
          difficulty: null,
          wouldTakeAgain: null,
          profileLink: `https://www.ratemyprofessors.com/ShowRatings.jsp?tid=${prof.tid}`,
          courses: []
        };
        
        // Save each professor to MongoDB if not already present
        const existingProfessor = await Professor.findOne({ profileLink: professorData.profileLink });
        if (!existingProfessor) {
          await Professor.create(professorData);
        }

        this.professors.push(professorData);
      }

      hasMore = jsonResponse.remaining > 0;
      pageIndex++;
    }

    await page.close();
    console.log(`Scraped ${this.professors.length} professors.`);
  }

  async scrapeProfessorDetails(professorData) {
    const page = await this.browser.newPage();
    const profileUrl = professorData.profileLink;
    await page.goto(profileUrl, { waitUntil: 'load' });

    const details = await page.evaluate(() => {
      const courseElement = document.querySelector('.RatingHeader__StyledClass-sc-1dlkqw1-3.eXfReS');
      const course = courseElement ? courseElement.innerText.trim() : null;

      const wouldTakeAgainElement = document.querySelector('.FeedbackItem__FeedbackNumber-uof32n-1.kkESWs');
      const wouldTakeAgainText = wouldTakeAgainElement ? wouldTakeAgainElement.innerText : null;
      const wouldTakeAgain = wouldTakeAgainText ? parseFloat(wouldTakeAgainText.replace('%', '')) : null;

      const difficultyElement = document.querySelectorAll('.FeedbackItem__FeedbackNumber-uof32n-1.kkESWs')[1];
      const difficulty = difficultyElement ? parseFloat(difficultyElement.innerText) : null;

      return { course, wouldTakeAgain, difficulty };
    });

    await page.close();

    // Update professor document in MongoDB with scraped data
    await Professor.updateOne(
      { profileLink: profileUrl },
      { 
        $set: { 
          courses: details.course ? [details.course] : [], // Save as array for MongoDB compatibility
          wouldTakeAgain: details.wouldTakeAgain,
          difficulty: details.difficulty
        } 
      }
    );

    console.log(`Updated details for ${professorData.name}`);
  }

  async run() {
    await this.scrapeProfessorList();
    
    for (const professorData of this.professors) {
      await this.scrapeProfessorDetails(professorData);
    }

    await this.closeBrowser();
  }
}

// Example Usage
(async () => {
  const api = new RateMyProfApi('1100');  // Replace with your school ID

  console.log("Starting scraping process...");
  await api.run();
  console.log("Scraping complete!");
})();
  