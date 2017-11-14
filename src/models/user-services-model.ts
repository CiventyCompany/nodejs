import * as bcrypt from 'bcrypt';

import {AllowNull, BeforeCreate, BeforeUpdate, Column, Model, NotEmpty, Table, Unique,} from 'sequelize-typescript';

import {INTEGER} from 'sequelize';
import {EUserRole, UserServices} from "../types";

@Table({
    tableName: 'user_services',
    timestamps: true,
})
export class UserServicesModel extends Model<UserServicesModel> implements UserServices {
    /**
     * Actual encryption
     * @param {string} password
     * @returns {PromiseLike<string>}
     */
    static encryptPassword(password: string): PromiseLike<string> {
        return bcrypt.genSalt(10).then((salt: string) => {
            return bcrypt.hash(password, salt);
        });
    }

    /**
     * Encrypts user password
     * @param {UserServicesModel} instance
     * @returns {any}
     */
    @BeforeCreate
    @BeforeUpdate
    static hashPassword(instance: UserServicesModel) {
        if (instance.changed('password')) {
            return this.encryptPassword(instance.password).then((password: string) => {
                instance.password = password;
            });
        } else {
            return Promise.resolve();
        }
    }

    /**
     * Compares input password with saved
     * @param {string} password
     * @returns {PromiseLike<boolean>} is valid password
     */
    isPasswordValid(password: string): PromiseLike<boolean> {
        return bcrypt.compare(password, this.getDataValue('password'));
    }

    @Unique
    @NotEmpty
    @AllowNull(false)
    @Column({
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 50],
        }
    })
    login: string;

    @NotEmpty
    @AllowNull(false)
    @Column({
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    })
    password: string;

    @NotEmpty
    @AllowNull(false)
    @Column({
        type: INTEGER,
        defaultValue: EUserRole.MODERATOR,
    })
    role: EUserRole;
}
