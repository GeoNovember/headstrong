const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');

const sequelize = new Sequelize('b7i6rsjwzlwsyfz7le7a', 'uwpqitz9sxjsbq9y', '4sCvHnhBpmu3CXRg3rFD', {
  host: 'b7i6rsjwzlwsyfz7le7a-mysql.services.clever-cloud.com',
  dialect: 'mysql',

});

sequelize.authenticate()
  .then(() => console.info('Connected to the Database'))
  .catch((err) => console.warn(err));


const Entries = sequelize.define('entries', {

  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  username: {
    type: Sequelize.STRING(50),
    allowNull: false
  },

  title: {
    type: Sequelize.STRING(100),
    allowNull: false
  },

  blog: {
    type: Sequelize.STRING(1000),
    allowNull: false
  },

  journalImage: {
    type: Sequelize.STRING(10000)
  },

  temp: {
    type: Sequelize.STRING
  },

  weatherDescription: {
    type: Sequelize.STRING
  },

  mood: {
    type: Sequelize.STRING
  }

});

// sequelize.sync({force: true})
//   .then(() => console.info('We good'))
//   .catch((err) => console.warn(err));

const getAllJournals = (user) => {
  if (user) {
    return Entries.findAll({
      where: {
        username: user
      }
    });
  } else {
    return Entries.findAll();
  }

};


const deleteJournal = (body) => {
  const { id } = body;
  return Entries.destroy({
    where: {
      id: id
    }
  });
};


const addJournals = async(body, user) => {

  console.info('USER', user);

  const { mood, title, blog, journalImage, temp, weatherDescription } = body;
  console.info('MOOD', mood);

  const newEntry = await Entries.create({
    username: user,
    title: title,
    blog: blog,
    journalImage: journalImage,
    temp: temp,
    weatherDescription: weatherDescription,
    mood: mood

  });

  return newEntry.save();
};

const updateJournal = (body) => {
  const { username, title, blog, id, journalImage } = body;
  //first object is what you want to change
  return Entries.update({
    username: username,
    blog: blog,
    title: title,
    journalImage: journalImage,
  },
  {
    where: {
      id: id
    }
  });

};

module.exports = {
  getAllJournals,
  addJournals,
  deleteJournal,
  updateJournal,
  Entries
};
