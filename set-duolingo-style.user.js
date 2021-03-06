// ==UserScript==
// @name SetDuolingoStyle
// @namespace Violentmonkey Scripts
// @match *://*.duolingo.com/*
// @grant none
// ==/UserScript==
(function() {
  'use strict';
  // set-duolingo-style.user.js

  // Script that modifies the style of duolingo.com sites.
  // Used with [Violentmonkey](https://violentmonkey.github.io).
  // Tested in my personal account so it may not work in other accounts
  // due to A/B testing, new updates or it may even have a bug :)

  // --------- Change the values here for different colors ---------
  // Note: color values are in hex ( https://htmlcolorcodes.com )
  const DARK_COLOR_VALUE = '3f2b96';
  const LIGHT_COLOR_VALUE = '3AABB8';
  const TEXT_COLOR_VALUE = 'ffffff';
  const TEXT_COLOR_DARK_VALUE = '4c4c4c';
  // ----------------------------------------------------------------

  const DARK_COLOR = `#${DARK_COLOR_VALUE}`;
  const LIGHT_COLOR = `#${LIGHT_COLOR_VALUE}`;
  const TEXT_COLOR = `#${TEXT_COLOR_VALUE}`;
  const TEXT_COLOR_DARK = `#${TEXT_COLOR_DARK_VALUE}`;

  const updateStyle = (element, selector, newStyle) =>
    element !== null
      ? Object.assign(element.style, newStyle)
      : console.warn(`no element found for "${selector}"`);

  const updateDocumentBody = color =>
    updateStyle(document.body, 'document.body', {backgroundColor: color});

  const updateSkillTree = () => {
    // update the main duolingo.com
    const skillTree = document.querySelectorAll("[data-test='skill-tree']");
    const update = skillTree && skillTree.length > 0;
    if (update) {
      // console.debug('------ updateSkillTree ------');
      [...skillTree].forEach(a =>
        updateStyle(a, "[data-test='skill-tree']", {
          backgroundColor: LIGHT_COLOR,
        }),
      );
      return true;
    }
    return false;
  };

  const updateSkillTreeExercise = () => {
    // update duolingo.com exercise in the skill tree
    const skillExercise = document.querySelectorAll("[data-test*='challenge']");

    const hasExercise = () => {
      return skillExercise && skillExercise.length > 0;
    };
    if (hasExercise()) {
      // console.debug('------ updateSkillTreeExercise ------');
      [...document.querySelectorAll('div')].forEach(a =>
        updateStyle(a, 'div', {backgroundColor: DARK_COLOR, color: TEXT_COLOR}),
      );
      [...document.querySelectorAll('button')].forEach(a =>
        updateStyle(a, 'button', {color: '#000', fontSize: '20px'}),
      );
      return true;
    }
    return false;
  };

  const updateStories = () => {
    // update stories.duolingo.com
    const storyGrid = document.querySelectorAll('.story-grid');
    const storyHeader = document.querySelectorAll('.stories-header');
    const storySet = document.querySelectorAll('.story-grid .set');
    const storySetHeader = document.querySelectorAll(
      '.story-grid .set .set-header',
    );
    const storyTitle = document.querySelectorAll(
      '.story-grid .set .story .title',
    );
    const hasStories = () => {
      let result = storyGrid && storyGrid.length > 0;
      result = result && storySet && storySet.length > 0;
      result = result && storySetHeader && storySetHeader.length > 0;
      result = result && storyTitle && storyTitle.length > 0;
      return result;
    };

    if (hasStories()) {
      // console.debug('------ updateStories ------');
      [...storyGrid].forEach(a =>
        updateStyle(a, 'storyGrid', {backgroundColor: LIGHT_COLOR}),
      );
      [...storyHeader].forEach(a =>
        updateStyle(a, 'storyHeader', {
          backgroundColor: DARK_COLOR,
          color: TEXT_COLOR,
        }),
      );
      [...storySet].forEach(a =>
        updateStyle(a, 'storySet', {backgroundColor: DARK_COLOR}),
      );
      [...storySetHeader].forEach(a =>
        updateStyle(a, 'storySetHeader', {color: TEXT_COLOR}),
      );
      [...storyTitle].forEach(a =>
        updateStyle(a, 'storyTitle', {color: TEXT_COLOR}),
      );
      return true;
    }
    return false;
  };

  const updateStory = () => {
    // update a story in stories.duolingo.com
    const storyContainer = document.querySelectorAll(
      '.transcription-container',
    );
    const storyTextTitle = document.querySelectorAll('.title .synced-text');
    const storyText = document.querySelectorAll(
      '.phrase, .synced-text, .answer, .challenge-question, .story-end-section, .title.completed',
    );
    const storyTextDark = document.querySelectorAll(
      '.point-to-phrase-synced-text.highlighted, .phrase-bank>span',
    );

    if (storyContainer && storyContainer.length > 0) {
      // console.debug('------ updateStory ------');
      [...storyContainer].forEach(a =>
        updateStyle(a, 'storyContainer', {
          backgroundColor: DARK_COLOR,
          color: TEXT_COLOR,
        }),
      );
      [...storyText].forEach(a =>
        updateStyle(a, 'storyContainer', {color: TEXT_COLOR}),
      );
      [...storyTextDark].forEach(a =>
        updateStyle(a, 'storyContainer', {color: TEXT_COLOR_DARK}),
      );
      [...storyTextTitle].forEach(a =>
        updateStyle(a, 'storyContainer', {color: TEXT_COLOR}),
      );
      return true;
    }
    return false;
  };

  const updateSubmitABugReport = () => {
    const main = document.querySelectorAll('main[role="main"]');
    if (main && main.length > 0) {
      // console.debug('------ updateSubmitABugReport ------');
      [...main].forEach(a =>
        updateStyle(a, 'main', {
          backgroundColor: DARK_COLOR,
          color: TEXT_COLOR,
        }),
      );
      const text = document.querySelectorAll('h1,p');
      [...text].forEach(a => updateStyle(a, 'text', {color: TEXT_COLOR}));
      return true;
    }
    return false;
  };

  const updateWordsTable = () => {
    // https://www.duolingo.com/words
    const words = document.querySelectorAll('._3zjVe');
    if (words && words.length > 0) {
      [...words].forEach(a =>
        updateStyle(a, 'words table', {backgroundColor: DARK_COLOR}),
      );
      const title = document.querySelectorAll('._3zjVe h1');
      [...title].forEach(a =>
        updateStyle(a, 'words title', {color: TEXT_COLOR}),
      );
      const cell = document.querySelectorAll('tr.VjtrX>td');
      [...cell].forEach(a => updateStyle(a, 'words cell', {color: TEXT_COLOR}));
      const info = document.querySelectorAll('.NYMhm h2, ._3Io2c');
      [...info].forEach(a => updateStyle(a, 'words info', {color: TEXT_COLOR}));
      return true;
    }
    return false;
  };

  const updateElementsLightColor = () => {
    const x1 = '.Af4up';
    const links = document.querySelectorAll(`a:not(${x1})`);
    [...links].forEach(a =>
      updateStyle(a, 'links', {textDecoration: 'underline'}),
    );

    const forum = '._1RSpr'; // subscriptions
    const forumRelatedDiscussions = '._1y1Vb';
    const userInNotificationsPopup = '[rel="nofollow"]';
    const titleInNotificationsPopup = '.Rl0dL';
    const el = `h1:not(${titleInNotificationsPopup}), h2:not(${forum}), h3, h4, h5, h6, td, p`;
    const elA = `a:not([data-test="lingot-store-button"]):not(${forumRelatedDiscussions}):not(${userInNotificationsPopup}):not(._3sWvR)`;
    const elUl = 'ul:not(._1ZY-H):not(._1XE6M)>li:not(._1Eh9P):not(._1CkMd)';
    const elOl = 'ol>li';
    const text = document.querySelectorAll(`${el},${elA},${elUl},${elOl}`);
    [...text].forEach(a => updateStyle(a, 'text', {color: TEXT_COLOR}));
  };

  const updateElementsDarkColor = () => {
    const darkText = document.querySelectorAll('code');
    [...darkText].forEach(a =>
      updateStyle(a, 'darkText', {color: TEXT_COLOR_DARK}),
    );
  };

  // eslint-disable-next-line no-unused-vars
  const observer = new MutationObserver((mutations, mutationObserver) => {
    // I really don't like using these automagically generated class names :-/

    // https://www.youtube.com/watch?v=Hn2zzi_lquA
    // JavaScript Mutation Observer
    // Kyle Robinson Young
    // https://github.com/shama/letswritecode/tree/master/javascript-mutation-observer
    mutations.forEach(function (mutation) {
      var i;
      if (mutation.addedNodes.length) {
        for(i=0; i<mutation.addedNodes.length; i++){
          console.debug('Added', mutation.addedNodes[i])
	}
      }
      if (mutation.removedNodes.length) {
        for(i=0; i<mutation.removedNodes.length; i++){
          console.debug('Removed', mutation.removedNodes[i])
	}
      }
    })

    /* Using a single background color */
    updateDocumentBody(DARK_COLOR);

    console.debug(Date());
    console.debug("Hello World");
    console.debug(window.location.href);
    console.debug(mutations);
    console.debug(mutationObserver);
    const tips = document.querySelectorAll('._1TgLl._1E3L7');
    [...tips].forEach(a =>
      updateStyle(a, 'tips', {backgroundColor: DARK_COLOR}),
    );

    const store = document.querySelectorAll('._2hEQd._1E3L7');
    [...store].forEach(a =>
      updateStyle(a, 'store', {backgroundColor: DARK_COLOR}),
    );

    if (updateSkillTreeExercise()) return;

    if (updateSkillTree()) return;

    if (updateStory()) return;

    if (updateStories()) return;

    if (updateSubmitABugReport()) return;

    if (updateWordsTable()) return;

    // console.debug('------updating all------');
    updateElementsLightColor();
    updateElementsDarkColor();
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
})();
