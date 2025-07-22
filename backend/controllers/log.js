const logModel = require('../model/log');

const createLog = async (req, res) => {
  try {
    const {
      event,
      actor_id,
      actor_role,
      target_table,
      target_id,
      action_result,
      description
    } = req.body;

    const log = await logModel.insertLog({
      event,
      actor_id,
      actor_role,
      target_table,
      target_id,
      action_result,
      description
    });

    res.status(201).json(log);
  } catch (error) {
    console.error('Log Error:', error);
    res.status(500).json({ error: 'Failed to log event' });
  }
};

const getAllLogs = async (req, res) => {
    try {
      const logs = await logModel.getAllLogs();
      res.status(200).json({ success: true, data: logs });
    } catch (err) {
      console.error("Error fetching logs:", err);
      res.status(500).json({ success: false, message: "Failed to fetch logs" });
    }
  }

module.exports = {
  createLog,getAllLogs
};
