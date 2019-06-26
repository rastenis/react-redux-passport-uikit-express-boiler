import bcrypt from "bcrypt";
import shortid from "shortid";
import db from "../db.js";
import to from "await-to-js";

const saltRounds = 10;

class User {
  constructor(data) {
    if (!data || !data._id) {
      this.data = {
        tokens: [],
        profile: {},
        ...data
      };

      this._meta = {
        new: true
      };
    } else {
      this.data = data;

      if (!Array.isArray(this.data.tokens)) {
        this.data.tokens = [];
      }

      if (typeof this.data.profile !== "object") {
        this.data.profile = {};
      }

      this._data = data;
      this._meta = {
        new: false
      };
    }
  }

  async verifyPassword(candidate) {
    return bcrypt.compare(candidate, this.data.password);
  }

  async password(newPassword = false) {
    if (newPassword !== false) {
      // generate new password, store locally & update db
      return new Promise(async (resolve, reject) => {
        let hashed = await this.hashPassword(this.data.password);

        let [err] = await to(
          db.User.findByIdAndUpdate(this.data._id, {
            $set: { password: hashed }
          }).exec()
        );

        if (err) {
          return reject(err);
        }

        // prepping a modified version of the user,
        // complete with the changed & hashed new password
        this.data.password = hashed;
        this._data.password = hashed;
        return resolve(this);
      });
    }
    // return the hashed password
    return this.data.password;
  }

  async hashPassword(password) {
    return new Promise(async (resolve, reject) => {
      if (!password || this._meta.noPassword) {
        return resolve(null);
      }
      let salt = await bcrypt.genSalt(saltRounds);
      let hash = await bcrypt.hash(password, salt);
      return resolve(hash);
    });
  }

  data(data = -1) {
    if (data !== -1) {
      // can't set full userdata!
      console.error("Cannot set full data!");
    } else {
      return this.data;
    }
  }

  async saveUser() {
    if (this._meta.new) {
      return new Promise(async (resolve, reject) => {
        // generating hashed password
        let hashed = await this.hashPassword(this.data.password);
        this.data.password = hashed;

        // pre-constructing profile
        this.data.profile = {};

        let [err, inserted] = await to(db.User.create(this.data));

        if (err) {
          return reject(err);
        }
        return resolve(new User(inserted));
      });
    }

    return new Promise(async (resolve, reject) => {
      if (this.isModified("password")) {
        let hashed = await this.hashPassword(this.data.password);
        this.data.password = hashed;

        this.data.password = hash;
        this._data = this.data;
        let [err] = await to(
          db.User.updateOne(
            {
              _id: this.data._id
            },
            this.data,
            {}
          ).exec()
        );

        if (err) {
          console.error(err);
          return reject(err);
        }
        return resolve(this);
      } else {
        this._data = this.data;
        let [err] = await to(
          db.User.findByIdAndUpdate(this.data._id, this.data, {}).exec()
        );
        if (err) {
          console.error(err);
          return reject(err);
        }
        return resolve(this);
      }
    });
  }

  async deleteUser() {
    return new Promise(async (resolve, reject) => {
      let [err] = await to(
        db.User.deleteOne({
          _id: this.data._id
        }).exec()
      );

      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve();
    });
  }

  isModified(field) {
    return this._data[field] !== this.data[field];
  }
}

module.exports = User;
