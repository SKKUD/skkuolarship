from celeryconfig import app

TASK_NAME = 'tasks.extract'


def enqueue_extract_task(*args, **kwargs):
    enqueue_to_sqs(TASK_NAME, *args, **kwargs)


def enqueue_to_sqs(task_name, *args, **kwargs):
    print('{} task enqueued with parameter: {}, {}'.format(task_name, args, kwargs))
    app.send_task(task_name, args, kwargs)
