const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

//create out User model
class User extends Model{}

//define table columns and configuration

User.init(
    {
        //dfine an id column
        id: {
            //use the special Sequelize datatypes objust provide what type of data
            type: DataTypes.INTEGER,

            //this is the equivalent of SQL's 'NOT NULL' option
            allowNull: false,
            //instruct that this is the primary key
            primaryKey: true,
            //turn on auto increment
            autoIncrement: true
        },
        //dfine username column
        username:{
            type: DataTypes.STRING,
            allowNull: false
        },
        //email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //cannot be dublicat email values in table
            unique: true,
            //if allowNull is set to false, we can run data through validator
            validate: {
                isEmail: true
                }
            },
            //password column
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    //this means the password must be at least four characters
                    len:[4]
            } 
        },
    },
    {
        //table configuration options go here (https://sequelize.org/v5/manual/models-definition.html#configuration)

        //pass in our imported sequalize connection (the direct connection to our database)
        sequelize,
        //don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        //don't pluralize name of database table
        freezeTableName: true,
        //use underscores instead of camel-casing (comment_text, not commentText)
        underscored: true,
        //make it so our model name stays lowervase in the database
        modelName: 'user'
    }
);

module.exports = User;