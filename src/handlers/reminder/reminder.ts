import { lockRepo } from "../api/infra";

const sendReminders = async (
  reminderThresholdMinutes: number
): Promise<void> => {
  const millisecondsPerMinute = 60000;
  const dateThreshold = new Date(
    Date.now() - reminderThresholdMinutes * millisecondsPerMinute
  );
  console.log(`dateThreshold: ${dateThreshold}`);
  const locks = await lockRepo.getAllGlobal();
  locks?.forEach((lock) => {
    console.log(
      `Lock: ${lock.name} | Owner: ${lock.owner} | Created: ${lock.created}`
    );
    if (lock.created < dateThreshold) {
      // TODO: Send private Slack message to lock owner
      console.log(
        `Sending reminder to '${lock.owner}' for lock '${lock.name}' created at ${lock.created}`
      );
    }
  });
};

export default sendReminders;
