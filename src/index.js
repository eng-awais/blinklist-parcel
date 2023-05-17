import { trackPageview, trackEvent } from './analytics-api.js';
import data from './data.json';
import { nanoid } from 'nanoid';

// Function to assign a random variation to a visitor for an article.
const assignVariation = (articleId, variations) => {
  // generate unique ID for visitor
  const uniqueId = nanoid();
  const assignedVariation = JSON.parse(localStorage.getItem('visitor'));

  if (!assignedVariation) {
    const randomIndex = Math.floor(Math.random() * (variations.length - 0)) + 0;
    const randomVariation = variations[randomIndex];
    localStorage.setItem(
      'visitor',
      JSON.stringify({
        id: uniqueId,
        variation: randomVariation,
        articleId: articleId,
      })
    );
    return randomVariation;
  }

  return assignedVariation.variation;
};

// Track "Sign up" button and send the event to the analytics backend.
const trackSignUpClick = () => {
  trackEvent({ event: 'SignUpButtonClick' });
  // Update CTR
};

// Function to determine the winning variation by comparing the click-through rates (CTR) of the variations.
const determineWinningVariation = (articleId) => {
  // Retrieve the CTR data for the variations of the article from the dummy data.
  let article = 'article' + articleId;
  const ctrData = data[article].ctr;

  // Compare the CTRs and determine the winning variation.
  let winningVariation = null;
  let maxCTR = 0;

  for (const variation in ctrData) {
    const ctr = ctrData[variation];

    if (ctr > maxCTR) {
      maxCTR = ctr;
      winningVariation = variation;
    }
  }

  return winningVariation;
};

// Function to render an article with the assigned variation.
const renderArticle = (articleId, variation) => {
  const articleContainer = document.querySelector('.article-container');
  let article = 'article' + articleId;
  const articleContent = data[article].content;
  articleContainer.innerHTML = `
    <h1>Check out the Blinkist app</h1>
    <img width="300" src=${articleContent[variation].image} alt="Check out the Blinkist app" />
    <div>${articleContent[variation].description}</div>
    <div>Thanks a lot for reading the article! <button id="signUpButton" href="/signup">SIGN UP</button> for Blinkist.</div>
  `;
};

// Function to get the current visitor's ID.

const getCurrentArticleId = () => {
  const visitor = JSON.parse(localStorage.getItem('visitor'));
  if (visitor) return visitor.articleId;
  return Math.floor(Math.random() * (Object.keys(data).length - 1 + 1)) + 1;
};

// Assuming there is a configuration object for the article variations.
const variations = ['control', 'test'];

// Assign a variation to the visitor for the current article.

// If visitor is unique than track the impression
trackPageview();

const articleId = getCurrentArticleId();
const assignedVariation = assignVariation(articleId, variations);

// Rendering the article with the assigned variation.
renderArticle(articleId, assignedVariation);

// Event listner to track signup events
const signUpButton = document.getElementById('signUpButton');
signUpButton.addEventListener('click', trackSignUpClick); //Onclick calculate CTR

// Calculating the winning variation
const winningVariation = determineWinningVariation(articleId);
