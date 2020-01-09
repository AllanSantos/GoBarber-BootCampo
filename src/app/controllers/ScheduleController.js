import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import User from '../models/User';
import Appointment from '../models/Appointment';

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!checkUserProvider) {
      return res.status(401).json({ error: 'User is not a provider' });
    }

    const { date } = req.query;
    const parsedDate = parseISO(date);

    // 2019-11-16 00:00:00
    // 2019-11-16 23:59:59

    const appoitments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
    });

    return res.json(appoitments);
  }
}

export default new ScheduleController();
