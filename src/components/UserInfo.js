export class UserInfo {
  constructor({ titleSelector, subtitleSelector, avatarSelector }) {
    this._titleElement = document.querySelector(titleSelector);
    this._subtitleElement = document.querySelector(subtitleSelector);
    this._avatarElement = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    const title = this._titleElement.textContent;
    const subtitle = this._subtitleElement.textContent;
    return { title, subtitle }
  }

  setUserInfo(title, subtitle, url) {
    this._titleElement.textContent = title;
    this._subtitleElement.textContent = subtitle;
    this._avatarElement.setAttribute('src', url)
  }
}
