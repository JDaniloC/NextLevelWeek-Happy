import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import orphanageView from '../Views/orphanages_view';
import Orphanage from '../models/Orphanages';
import * as Yup from 'yup';

export default {
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await orphanagesRepository.find({
            relations: ['images']
        });

        return response.json(orphanageView.renderMany(orphanages));
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const orphanagesRepository = getRepository(Orphanage);

        try {
            const orphanages = await orphanagesRepository.findOneOrFail(id, {
                relations: ['images']
            });
            return response.json(orphanageView.render(orphanages));
        } catch (err) {
            return response.status(400).json({ "error":"id doesn't exist" });
        }
    },

    async create(request: Request, response: Response) {
        const {
            name, 
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;
    
        const orphanagesRepository = getRepository(Orphanage);
    
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename };
        })

        const data = {
            name, 
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === "true" ? true : false,
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(388),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const orphanages = orphanagesRepository.create(data);
    
        const newOrphanage = await orphanagesRepository.save(orphanages);
    
        return response.status(201).json(newOrphanage);
    }
}