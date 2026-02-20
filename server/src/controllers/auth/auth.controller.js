const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  addUser,
  getUserByEmail,
  updateUser,
  deleteUser,
} = require('../../repositories/user/user.repository');

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const hashed_password = await bcrypt.hash(password, 10);

    await addUser(name, email, hashed_password);
    res.status(201).json({ success: true, data: 'User registered successfully' });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const match = await bcrypt.compare(password, user.hashed_password);
    if (!match) {
      throw new Error('Unauthorized');
    }

    const payload = {
      user_id: user.user_id,
      email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ success: true, data: { token } });
  } catch (err) {
    next(err);
  }
}

async function updateProfile(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const { user_id } = req.user;

    let hashed_password = null;
    if (password) {
      hashed_password = await bcrypt.hash(password, 10);
    }

    const result = await updateUser(user_id, name, email, hashed_password);
    if (result.rowCount === 0) {
      throw new Error('RESOURCE_NOT_FOUND');
    }

    return res.status(200).json({ success: true, data: 'Successfully updated' });
  } catch (err) {
    next(err);
  }
}

async function deleteProfile(req, res, next) {
  try {
    const { user_id } = req.user;

    const result = await deleteUser(user_id);
    if (result.rowCount === 0) {
      throw new Error('RESOURCE_NOT_FOUND');
    }

    return res.status(200).json({ success: true, data: 'User successfully deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, updateProfile, deleteProfile };
