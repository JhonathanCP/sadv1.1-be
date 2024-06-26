import { Module, Report } from "../models/models.js";

// Obtener todos los modulos
export const getAllModules = async (req, res) => {
    try {
        const modules = await Module.findAll();
        res.json(modules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los modulos" });
    }
};

// Obtener un modulo por su ID
export const getModuleById = async (req, res) => {
    const { id } = req.params;
    try {
        const module = await Module.findByPk(id);
        if (module) {
            res.json(module);
        } else {
            res.status(404).json({ message: "modulo no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener el modulo" });
    }
};

// Crear un nuevo modulo
export const createModule = async (req, res) => {
    const { name, description, icon } = req.body;
    try {
        const newModule = await Module.create({
            name,
            description,
            icon
        });
        res.status(201).json(newModule);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear el modulo" });
    }
};

// Actualizar un modulo existente
export const updateModule = async (req, res) => {
    const { id } = req.params;
    const { name, description, icon, active } = req.body;
    try {
        const module = await Module.findByPk(id);
        if (module) {
            await module.update({
                name,
                description,
                icon,
                active
            });
            res.json(module);
        } else {
            res.status(404).json({ message: "modulo no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el modulo" });
    }
};

// Eliminar un modulo existente
export const deleteModule = async (req, res) => {
    const { id } = req.params;
    try {
        const module = await Module.findByPk(id);
        if (module) {
            await module.destroy();
            res.json({ message: "modulo eliminado correctamente" });
        } else {
            res.status(404).json({ message: "modulo no encontrado" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al eliminar el modulo" });
    }
};

export const getModulesByFreeReport = async (req, res) => {
    try {
        const modules = await Module.findAll({
            include: {
                model: Report,
                where: { free: true },
                required: true // Asegura que solo se incluyan los módulos con al menos un reporte free
            }
        });
        res.status(200).json(modules);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};