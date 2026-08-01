import { Router } from 'express';
import { getUsers, createUser } from 'controllers/userController';
import { validateUser } from 'validators/userValidator';

const router = Router();

router.get('/', getUsers);
router.post('/', validateUser, createUser);

export default router;
