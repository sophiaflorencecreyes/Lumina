export class CastMember {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.character = data.character;
    this.isVoice = data.isVoice;
    this.photoUrl = data.photoUrl; // <--- Make sure this is here!
  }


  // e.g. "Aang voice" or "Daenerys Targaryen"
  getRoleLabel() {
    return this.isVoice ? `${this.character} voice` : this.character;
  }
}