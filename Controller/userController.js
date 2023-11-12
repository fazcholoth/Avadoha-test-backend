import User from '../Models/users.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET , {
    expiresIn: '30d',
  })
}

export const signupUser = async (req, res) => {
    const { name, email, password } = req.body
     
    console.log(req.body);
    if (!name || !email || !password) {
      res.status(400)
      res.json('Please add all fields')
      return
    }
  
    
    const userExists = await User.findOne({
      where: {
        email: email, 
      },
    })
  
    if (userExists) {
      res.status(400)
      res.json('User already exists')
      return
    }
  
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
   
    const user = await User.create({
      username:name,
      email:email,
      password: hashedPassword,
    })
  
    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.username,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      res.json('Invalid user data')
    }
  }


  export const loginUser = async (req, res) => {
    const { email, password } = req.body
  
    const user = await User.findOne({
      where: {
        email: email, 
      },
    });

    if (!user) {
      res.json('not a registered user')
      return
    }
  
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.username,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400)
      res.json('Incorrect Password')
    }
  }


  export const getUsers = async (req, res) => {

    const Users = await User.findAll()
    res.json(Users)

  }


  export const createUser = async (req, res) => {
    const { name, email ,password} = req.body
  
    if (!name || !email || !password) {
      res.status(400)
      res.json('please add name , email and password')
      return
    }
  
    
    const userExists = await User.findOne({
      where: {
        email: email, 
      },
    })
  
    if (userExists) {
      res.status(400)
      res.json('User already exists')
      return
    }
    

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
      username:name,
      email:email,
      password: hashedPassword,
    })
  
    
      res.status(201).json({
        _id: user.id,
        name: user.username,
        email: user.email,
      })
    
  }




export const updateUser = async (req, res) => {
  const { id } = req.params; 
  const { name, email, password } = req.body;

  try {
    const user = await User.findByPk(id); 

    if (!user) {
      res.status(404);
      res.json('User not found');
      return
    }

    user.username = name || user.username;
    user.email = email || user.email;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save(); 

    res.status(200).json({
      _id: updatedUser.id,
      name: updatedUser.username,
      email: updatedUser.email,
      token: generateToken(updatedUser._id),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteUser = async (req, res) => {
  const { id } = req.params; 

  try {
    const user = await User.findByPk(id); 
    if (!user) {
      res.json('user not found')
      return
    }
    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const logoutUser = async (req, res) => {

  try {

    res.json({ message: 'User logged out' });

  } catch (error) {
    
  }
};







