// ==UserScript==
// @name SetDuolingoStyle
// @namespace Violentmonkey Scripts
// @match *://*.duolingo.com/*
// @grant none
// ==/UserScript==
(function() {
    'use strict';
  
    // Script that modifies the style of duolingo.com sites. Used with [Violentmonkey](https://violentmonkey.github.io).
    // Tested in my personal account so it may not work in other accounts due to A/B testing, new updates or
    // it may even have a bug :)

    const DARK_COLOR = '#3f2b96';
    const LIGHT_COLOR = '#3AABB8';
    const TEXT_COLOR = '#ffffff';
    const TEXT_COLOR_DARK = '#4c4c4c';
  
    const updateStyle = (element, selector, newStyle) => element !== null ? Object.assign(element.style, newStyle): console.warn(`no element found for "${selector}"`);

    const updateDocumentBody = color => updateStyle(document.body, 'document.body', {backgroundColor: color});

    const updateSkillTree = mutationObserver => {
      // update the main duolingo.com
      const skillTree = document.querySelectorAll("[data-test='skill-tree']");
      const update = skillTree && skillTree.length > 0;
      // console.log('updateSkillTree', update);
      if (update) {
        [...skillTree].forEach(a => updateStyle(a, "[data-test='skill-tree']", {backgroundColor: LIGHT_COLOR}));
        return true;
      }
      return false;
    }
    
    const updateSkillTreeExercise = (mutations, mutationObserver) => {
      // *** work in progress ***
      // update duolingo.com exercise in the skill tree
      const skillExercise = document.querySelectorAll("[data-test*='challenge']"); 
      
      const hasExercise = ()  => {
        return skillExercise &&
          skillExercise.length > 0;
      }
      if (hasExercise()) {
        [...document.querySelectorAll('div')].forEach(a => updateStyle(a, "div", {backgroundColor: DARK_COLOR, color: TEXT_COLOR}));
        [...document.querySelectorAll('button')].forEach(a => updateStyle(a, "button", {color: '#000', fontSize: '20px'}));
        return true;
      }
      return false;
    }
    
    const updateStories = mutationObserver => {
      // update stories.duolingo.com
      const storyGrid = document.querySelectorAll('.story-grid');
      const storySet = document.querySelectorAll('.story-grid .set');
      const storySetHeader = document.querySelectorAll('.story-grid .set .set-header');
      const storyTitle = document.querySelectorAll('.story-grid .set .story .title');
      const hasStories = () => {
        return storyGrid &&
          storyGrid.length > 0 &&
          storySet &&
          storySet.length > 0 &&
          storySetHeader &&
          storySetHeader.length > 0
          storyTitle &&
          storyTitle.length > 0;
      }

      if (hasStories()){
        [...storyGrid ].forEach(a => updateStyle(a, 'storyGrid', { backgroundColor: LIGHT_COLOR }));
        [...storySet ].forEach(a => updateStyle(a, 'storySet', { backgroundColor: DARK_COLOR }));
        [...storySetHeader ].forEach(a => updateStyle(a, 'storySetHeader', { color: TEXT_COLOR }));
        [...storyTitle ].forEach(a => updateStyle(a, 'storyTitle', { color: TEXT_COLOR }));
        return true;
      }
      return false;
    }
    
    const updateStory = mutationObserver => {
      // update a story in stories.duolingo.com
      const storyContainer = document.querySelectorAll('.transcription-container');
      const storyTextTitle = document.querySelectorAll('.title .synced-text');
      const storyText = document.querySelectorAll('.phrase, .synced-text, .answer, .challenge-question, .story-end-section, .title.completed');
      const storyTextDark = document.querySelectorAll('.point-to-phrase-synced-text.highlighted');
      
      if (storyContainer && storyContainer.length > 0){
        [...storyContainer ].forEach(a => updateStyle(a, 'storyContainer', { backgroundColor: DARK_COLOR, color: TEXT_COLOR}));
        [...storyText ].forEach(a => updateStyle(a, 'storyContainer', { color: TEXT_COLOR}));
        [...storyTextDark ].forEach(a => updateStyle(a, 'storyContainer', { color: TEXT_COLOR_DARK}));
        [...storyTextTitle ].forEach(a => updateStyle(a, 'storyContainer', { color: TEXT_COLOR}));
        return true;
      }
      return false;      
    }

    /* Using a single background color */
    updateDocumentBody(DARK_COLOR);
    
    const observer = new MutationObserver((mutations, mutationObserver) => {
      // I really don't like using these automagically generated class names :-/
     
      const tips = document.querySelectorAll('._1TgLl._1E3L7');
      [...tips].forEach(a => updateStyle(a, 'tips', { backgroundColor: DARK_COLOR }));

      const store = document.querySelectorAll('._2hEQd._1E3L7');
      [...store].forEach(a => updateStyle(a, 'store', { backgroundColor: DARK_COLOR }));

      if (updateSkillTreeExercise(mutations, mutationObserver)) return;
      if (updateSkillTree(mutations, mutationObserver)) return;

      if (updateStory(mutations, mutationObserver)) return;
      if (updateStories(mutations, mutationObserver)) return;

      const darkText = document.querySelectorAll('code');
      [...darkText].forEach(a => updateStyle(a, 'darkText', { color: TEXT_COLOR_DARK}));
      const links = document.querySelectorAll('a:not(.Af4up)');
      [...links].forEach(a => updateStyle(a, 'links', { textDecoration: 'underline'}));
      const text = document.querySelectorAll('h1, h2, h3, h4, h5, h6, td, a:not([data-test="lingot-store-button"]):not(._3sWvR), p, ul:not(._1ZY-H):not(._1XE6M)>li:not(._1Eh9P), ol>li');
      [...text].forEach(a => updateStyle(a, 'text', { color: TEXT_COLOR}));
    });

    observer.observe(document, {
      childList: true,
      subtree: true
    });
})();
