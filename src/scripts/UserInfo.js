export class UserInfo {
  constructor({ titleSelector, subtitleSelector }) {
    this._titleElement = document.querySelector(titleSelector);
    this._subtitleElement = document.querySelector(subtitleSelector);
  }

  getUserInfo() {
    const title = this._titleElement.textContent;
    const subtitle = this._subtitleElement.textContent;
    return { title, subtitle }
  }

  setUserInfo(title, subtitle) {
    this._titleElement.textContent = title;
    this._subtitleElement.textContent = subtitle;
  }
}
