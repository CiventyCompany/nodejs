import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import * as config from 'config';

import { UserServicesModel } from '../../models/user-services-model';

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('jwt.secret').toString(),
};

passport.use(new JwtStrategy(jwtOptions, async (payload, next) => {
    const user = await UserServicesModel.findById(payload.id);
    if (user) {
        next(null, {
            id: user.getDataValue('id'),
            login: user.getDataValue('login'),
            role:  user.getDataValue('role')
        });
    } else {
        next(null, false);
    }
}));

export class TokenSerializer {
    /**
     * Serializes payload for JSON Web Token
     * @param payload
     * @returns {string}
     */
    static serialize(payload: any): string {
        return jwt.sign(payload, jwtOptions.secretOrKey);
    }
}

export const adminAuthMiddleware = passport;
