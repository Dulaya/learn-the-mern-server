import express from 'express';

const router = express.Router();

router.post('/', (request, response) => {
    /*
        handle registration
        Check if username exists
        Check if email exists (optional email)
        Check if password meets requirement
        Hash password (optional for now, will need later; use bcrypt.genSalt & bcrypt.hash)
        
        Create new user, something like: 
            const user = new User ({
                username: request.body.username,
                email: request.body.email,
                password: hashPassword,
            })

        Save to database, something like: 
            try {
                const savedUser = await user.save();
                response.send(savedUser);
            } catch (error) {
                response.status(400).send(error);
            }
        
    */

});

export default router;