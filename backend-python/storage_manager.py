import os
import pickle
from google.cloud import storage

class GCSIndexManager:
    def __init__(self, bucket_name):
        self.storage_client = storage.Client()
        self.bucket = self.storage_client.bucket(bucket_name)

    def upload_index(self, local_path, syllabus_id):
        """Uploads the .pkl to GCS."""
        blob = self.bucket.blob(f"indices/{syllabus_id}.pkl")
        blob.upload_from_filename(local_path)
        print(f"Index {syllabus_id} uploaded to GCS.")

    def download_index(self, syllabus_id, local_path):
        """Downloads the .pkl from GCS if it exists."""
        blob = self.bucket.blob(f"indices/{syllabus_id}.pkl")
        if blob.exists():
            blob.download_to_filename(local_path)
            return True
        return False