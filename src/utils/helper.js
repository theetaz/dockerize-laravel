/**
 * @name helper.js
 * @fileOverview helper file for commonly used data manipulation functions
 * @author rugfreecoins
 */

function getNameText(userData) {
    if (userData) {
      let slpitName = userData.split(" ");
      let text = "";
      slpitName.forEach((userData) => {
        text = text + userData.charAt(0);
      });
      return text;
    }
    return null;
  }
module.exports = {
    getNameText: getNameText
} 