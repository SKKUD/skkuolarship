import os

from celery import Celery

broker_url = 'sqs://'
task_default_queue = os.environ.get('QUEUE_NAME')
broker_transport_options = {
    'region': 'ap-northeast-2',
    'predefined_queues': {
        task_default_queue: {
            'url': os.environ.get('QUEUE_URL'),
            'access_key_id': os.environ.get('AWS_ACCESS_KEY_ID'),
            'secret_access_key': os.environ.get('AWS_SECRET_ACCESS_KEY'),
        }
    }
}
app = Celery('tasks')
app.config_from_object('celeryconfig')
