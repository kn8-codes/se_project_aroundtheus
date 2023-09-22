export default class UserInfo {
    constructor(name, profession) {
      this.name = name;
      this.profession = profession;
    };
  
    getUserInfo() {
      return {
        profession: this.profession.textContent,
        name: this.name.textContent,
      };
    };

    setUserInfo({name, about}) {
        this.name.textContent = name;
        this.profession.textContent = about;
    };

    getId() {
      return this._userId;
    }
  };

    
