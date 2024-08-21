"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
class BaseService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(entity) {
        try {
            const createdEntity = await this.repository.create(entity);
            const savedEntity = await this.repository.save(createdEntity);
            return { statusCode: 201, status: 'success', data: savedEntity };
        }
        catch (error) {
            if (error.code === '23505') {
                return { statusCode: 409, status: 'error', message: error.detail };
            }
            else {
                return { statusCode: 500, status: 'error', message: error.message };
            }
        }
    }
    async update(id, updateData) {
        try {
            const isExist = await this.findOne(id);
            if (isExist.statusCode === 404) {
                return isExist;
            }
            const where = {};
            const primaryKey = this.repository.metadata.primaryColumns[0].databaseName;
            where[primaryKey] = id;
            const validColumns = this.repository.metadata.columns.map(column => column.propertyName);
            const updateQuery = {};
            const keys = Object.keys(updateData);
            for (const key of keys) {
                if (updateData.hasOwnProperty(key) && validColumns.includes(key)) {
                    updateQuery[key] = updateData[key];
                }
            }
            const result = await this.repository.createQueryBuilder()
                .update()
                .set(updateQuery)
                .where(where)
                .returning('*')
                .execute();
            if (result.affected > 0) {
                return { statusCode: 200, status: 'success', data: result.raw[0] };
            }
            else {
                return { statusCode: 400, status: 'error', data: null, message: 'Invalid Data' };
            }
        }
        catch (error) {
            return { statusCode: 500, status: 'error', message: error.message };
        }
    }
    async findOne(id) {
        try {
            const where = {};
            const primaryKey = this.repository.metadata.primaryColumns[0].databaseName;
            where[primaryKey] = id;
            const options = { where: where };
            const data = await this.repository.findOne(options);
            if (data) {
                return { statusCode: 200, status: 'success', data: data };
            }
            else {
                return { statusCode: 404, status: 'error', message: 'Not Found' };
            }
        }
        catch (error) {
            return { statusCode: 500, status: 'error', message: error.message };
        }
    }
    async findAll(queryParams) {
        try {
            let data = [];
            if (Object.keys(queryParams).length > 0) {
                const query = await this.repository.createQueryBuilder();
                for (const field in queryParams) {
                    if (queryParams.hasOwnProperty(field)) {
                        const value = queryParams[field];
                        query.andWhere(`${field} = '${value}'`);
                    }
                }
                data = await query.getMany();
            }
            else {
                data = await this.repository.find();
            }
            return { statusCode: 200, status: 'success', data: data };
        }
        catch (error) {
            return { statusCode: 500, status: 'error', data: [], message: error.message };
        }
    }
    async delete(id) {
        try {
            const isExist = await this.findOne(id);
            if (isExist.statusCode === 404) {
                return isExist;
            }
            await this.repository.delete(id);
            return { statusCode: 200, status: 'success' };
        }
        catch (error) {
            return { statusCode: 500, status: 'error', message: error.message };
        }
    }
    async findByIds(ids) {
        try {
            const primaryKey = this.repository.metadata.primaryColumns[0].databaseName;
            const data = await this.repository
                .createQueryBuilder()
                .where(`${primaryKey} IN (:...ids)`, { ids: ids })
                .getMany();
            return { statusCode: 200, status: 'success', data: data };
        }
        catch (error) {
            return { statusCode: 500, status: 'error', data: [], message: error.message };
        }
    }
    async customQuery(query) {
        try {
            const data = await this.repository
                .createQueryBuilder()
                .where(query)
                .getMany();
            return data;
        }
        catch (error) {
            console.error(`Error while executing custom query: ${query}`, error);
            return [];
        }
    }
}
exports.BaseService = BaseService;
