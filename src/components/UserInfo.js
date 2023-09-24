export default class UserInfo {
    constructor(name, profession, avatar) {
      this.name = name;
      this.profession = profession;
      this.avatar = avatar;
    };
  
    getUserInfo() {
      return {
        profession: this.profession.textContent,
        name: this.name.textContent,
      };
    };

    setUserInfo({name, about, avatar, _id}) {
        this.name.textContent = name;
        this.profession.textContent = about;
        this.avatar.src = avatar;
        this.userId = _id;
    };

    getId() {
      return this._userId;
    }
  };

    
