const Sequelize = require('sequelize');
const profileConstant = require('../constants/profile.constant');

module.exports = function init(sequelize) {
  class Profile extends Sequelize.Model {}
  Profile.init(
    {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profession: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      balance: {
        type: Sequelize.DECIMAL(12, 2),
      },
      type: {
        type: Sequelize.ENUM(...Object.values(profileConstant.profileType)),
      },
      fullName: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
      },
    },
    {
      sequelize,
      modelName: 'Profile',
    },
  );

  return Profile;
};
