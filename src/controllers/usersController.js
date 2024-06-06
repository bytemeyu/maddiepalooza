import bcrypt from 'bcryptjs';
import { usersService } from "../services/usersService.js";

export const usersController = {
    getAllUsers: async(req, res) => {
        try {
            const allUsers = await usersService.getAllUsers();

            if(allUsers.length === 0) {
                res.status(404).json(
                    {
                        'success': false,
                        'data': 'Não há nenhum usuário no banco de dados'
                    }
                );
                return;
            }

            res.status(200).json(
                {
                    'success': true, 	
                    'data': allUsers,
                }
            );
        } catch(err) {
            console.error(`Erro ao recuperar todos os usuários: ${err.message}`);
            res.status(500).json(
                {
                    'success': false, 	
                    'error': 'Erro ao recuperar todos os usuários',
                }
            );
        }
    },

    getUserById: async(req, res) => {
        const { id } = req.params;

        try {
            const userById = await usersService.getUserById(id);
            if(!userById){
                res.status(404).json(
                    {
                        'success': false,
                        'data': 'Não há nenhum usuário com o id especificado no banco de dados'
                    }
                );
                return;
            }

            res.status(200).json(
                {
                    'success': true,
                    'data': userById,
                }
            );
        } catch(err) {
            console.error(`Erro ao recuperar usuário com id ${id}: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao recuperar usuário a partir de id',
                }
            );
        }
    },

    createUser: async(req, res) => {
        const { email, username, password, role } = req.body;

        if(req.user.role === 'producer' && role !== 'assistant') {
            return res.status(403).json(
                {
                    'success': false,
                    'error': 'Produtores (producer) só podem criar usuários do tipo assistente (assistant)'
                }
            );
        }

        const password_hash = await bcrypt.hash(password, 10);

        try {
            const createdUser = await usersService.createUser(email, username, password_hash, role);
            res.status(200).json(
                {
                    'success': true,
                    'data': createdUser,
                }
            );
        } catch(err) {
            console.error(`Erro ao criar novo usuário no banco de dados: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao criar novo usuário no banco de dados',
                }
            );
        }
    },

    updateUser: async(req, res) => {
        const { id } = req.params;
        const { email, username, password, role } = req.body;

        try {
            const authenticatedUser = req.user;
            const outdatedUser = await usersService.getUserById(id);

            if(!outdatedUser){
                res.status(404).json(
                    {
                        'success': false,
                        'data': 'Não há nenhum usuário com o id especificado no banco de dados'
                    }
                );
                return;
            }

            if((authenticatedUser.role === 'producer' && outdatedUser.role === 'webadmin') || (authenticatedUser.role === 'assistant' && (outdatedUser.role === 'webadmin' || outdatedUser.role === 'producer'))) {
                return res.status(403).json(
                    {
                        'success': false,
                        'error': 'Permissão negada para atualizar este usuário'
                    });
            }
            //producer não pode alterar webadmin; assistant não pode alterar webadmin nem producer;

            let roleToUse;

            if(authenticatedUser.role === 'producer' && outdatedUser.role === 'producer') {
                roleToUse = outdatedUser.role;
            }
            //se for um producer alterando um producer, o tipo producer deve se manter (não tem como ele promover a webadmin, nem rebaixar a assistant);

            if(authenticatedUser.role === 'producer' && outdatedUser.role === 'assistant' && role !== 'webadmin') {
                roleToUse = role || outdatedUser.role;
            }
            //se for um producer alterando um assistant, ele pode promover o assistant a producer (nunca a webadmin);

            if(authenticatedUser.role === 'assistant' && outdatedUser.role === 'assistant') {
                roleToUse = outdatedUser.role;
            }
            //se for um assistant alterando um assistant, o tipo assistant deve se manter;

            const emailToUse = email || outdatedUser.email;
            const usernameToUse = username || outdatedUser.username;
            let password_hashToUse = outdatedUser.password_hash;
            if(password) {
                password_hashToUse = await bcrypt.hash(password, 10);

            }            

            const updatedUser = await usersService.updateUser(id, emailToUse, usernameToUse, password_hashToUse, roleToUse);
            res.status(200).json(
                {
                    'success': true,
                    'data': updatedUser,
                }
            );   
        } catch(err) {
            console.error(`Erro ao atualizar usuário com id ${id} no banco de dados: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao atualizar usuário no banco de dados',
                }
            );
        }
    },

    deleteUser: async(req, res) => {
        const { id } = req.params;

        try {
            const userById = await usersService.getUserById(id);
            if(!userById){
                res.status(404).json(
                    {
                        'success': false,
                        'data': 'Não há nenhum usuário com o id especificado no banco de dados'
                    }
                );
                return;
            }

            const deletedUser = await usersService.deleteUser(id);
            res.status(200).json(
                {
                    'success': true,
                    'data': deletedUser,
                }
            ); 
        } catch {
            console.error(`Erro ao deletar usuário com id ${id} no banco de dados: ${err.message}`);
            res.status(500).json(
                {
                    'success': false,
                    'error': 'Erro ao deletar usuário do banco de dados',
                }
            );
        }
    }
};