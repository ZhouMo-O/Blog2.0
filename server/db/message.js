const messageDb = require("../model/Message");

class Message {
  constructor(type, content, state, email, userNmae) {
    this.messageDb = messageDb;
    this.type = type;
    this.content = content;
    this.state = state;
    this.userNmae = userNmae;
    this.email = email;
  }

  async saveMessage() {
    let messageObj = {
      type: this.type,
      conten: this.content,
      state: this.state,
      userNmae: this.userNmae,
      email: this.email,
    };
    let message = await this.messageDb.create(messageObj);

    return { code: 1, data: message };
  }
}
