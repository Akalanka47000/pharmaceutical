import express from 'express';
import { celebrate, Segments } from 'celebrate'
import { default as filterQuery } from '@sliit-foss/mongoose-filter-query';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import { objectIdSchema, toSuccess } from '../../../../utils';
import { serviceCreateUser, serviceGetUsers, serviceGetUserById, serviceUpdateUserById, serviceUpdateMultipleUsers, serviceDeleteUserById } from './service';
import { createUserSchema, updateUserSchema } from './schema';

const user = express.Router();

user.post('/', celebrate({ [Segments.BODY]: createUserSchema }), tracedAsyncHandler(async function controllerCreateUser(req, res) {
    const data = await serviceCreateUser(req.body);
    return toSuccess({ res, data, message: 'User created successfully!' })
}));

user.get('/', filterQuery, tracedAsyncHandler(async function controllerGetUsers(req, res) {
    const data = await serviceGetUsers(req.query.filter, req.query.sort, req.query.page, req.query.limit);
    return toSuccess({ res, data, message: 'Users fetched successfully!' })
}));

user.get('/:id', celebrate({ [Segments.PARAMS]: objectIdSchema() }), tracedAsyncHandler(async function controllerGetUserById(req, res) {
    const data = await serviceGetUserById(req.params.id);
    return toSuccess({ res, data, message: 'User fetched successfully!' })
}));

user.put('/:id',
    celebrate({ [Segments.PARAMS]: objectIdSchema(), [Segments.BODY]: updateUserSchema }),
    tracedAsyncHandler(async function controllerUpdateUserById(req, res) {
        const data = await serviceUpdateUserById(req.params.id, req.body);
        return toSuccess({ res, data, message: 'User updated successfully!' })
    }));

user.put('/', filterQuery, celebrate({ [Segments.BODY]: updateUserSchema }), tracedAsyncHandler(async function controllerUpdateMultipleUsers(req, res) {
    const data = await serviceUpdateMultipleUsers(req.body.filters, req.body.data);
    return toSuccess({ res, data, message: 'Users updated successfully!' })
}));

user.delete('/:id', celebrate({ [Segments.PARAMS]: objectIdSchema() }), tracedAsyncHandler(async function controllerDeleteUserById(req, res) {
    const data = await serviceDeleteUserById(req.params.id);
    return toSuccess({ res, data, message: 'User deleted successfully!' })
}));

export default user;