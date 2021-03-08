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

    /*
        Example: 

        //Validate data
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        //Check if user is alread in database
        const userExist = await User.findOne({ username: req.body.username });
        if (userExist) return res.status(400).send('Username already exists');

        //Check if email is alread in database
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) return res.status(400).send('Email already exists');

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //Create a new user
        const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
        });
        try {
        const savedUser = await user.save();
        res.send(savedUser);
        } catch (err) {
        res.status(400).send(err);
        }

    */ 

});

export default router;