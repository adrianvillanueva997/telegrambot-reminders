import datetime

TELEGRAM_GROUP_ID = -1001063900471


def setup_thursday_routine() -> datetime.datetime:
    # Schedule the job to run every Thursday at 00:00 (midnight)
    now = datetime.datetime.now()
    target_time = datetime.datetime(now.year, now.month, now.day, 0, 0)
    if target_time < now:
        target_time += datetime.timedelta(
            days=7
        )  # Schedule it for the next week if it's already passed
    days_until_thursday = (target_time.date() - now.date()).days
    target_time += datetime.timedelta(days=days_until_thursday)
    return target_time


def setup_daily_routine() -> datetime.datetime:
    # Schedule the daily routine to run every day at 00:00 (midnight)
    now = datetime.datetime.now()
    target_time = datetime.datetime(now.year, now.month, now.day, 0, 0)
    if target_time < now:
        target_time += datetime.timedelta(
            days=1
        )  # Schedule it for the next day if it's already passed

    days_until_next_day = (target_time.date() - now.date()).days
    target_time += datetime.timedelta(days=days_until_next_day)
    return target_time
