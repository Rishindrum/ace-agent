import os
import datetime
from google.cloud import bigquery

# Set GOOGLE_APPLICATION_CREDENTIALS if key.json is present in the parent or current directory
possible_key_paths = [
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "key.json"),
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "key.json"),
]
for path in possible_key_paths:
    if os.path.exists(path):
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = os.path.abspath(path)
        print(f"[AnalyticalMemory] Set credentials from: {os.path.abspath(path)}")
        break

PROJECT_ID = "ace-agent-demo"
DATASET_ID = "ace_performance"
TABLE_ID = "quiz_scores"

def get_bigquery_client():
    """Returns an initialized BigQuery client for the demo project."""
    return bigquery.Client(project=PROJECT_ID)

def write_quiz_score(user_id: str, topic_name: str, score: int) -> bool:
    """
    Writes a new quiz score record to BigQuery.
    
    Args:
        user_id: The Firebase UID of the student.
        topic_name: The specific syllabus topic tested.
        score: The percentage score (0-100).
        
    Returns:
        bool: True if write succeeded, False otherwise.
    """
    print(f"[AnalyticalMemory] Writing quiz score for {user_id} on {topic_name}: {score}%")
    try:
        client = get_bigquery_client()
        table_ref = f"{PROJECT_ID}.{DATASET_ID}.{TABLE_ID}"
        
        # Current UTC timestamp in ISO format
        timestamp_str = datetime.datetime.now(datetime.timezone.utc).isoformat()
        
        row_to_insert = {
            "user_id": user_id,
            "topic_name": topic_name,
            "score": score,
            "timestamp": timestamp_str
        }
        
        errors = client.insert_rows_json(table_ref, [row_to_insert])
        if errors:
            print(f"[AnalyticalMemory] BigQuery insert error: {errors}")
            return False
            
        print("[AnalyticalMemory] Successfully wrote score to BigQuery.")
        return True
    except Exception as e:
        print(f"[AnalyticalMemory] BigQuery write failed: {e}")
        return False

def read_quiz_scores(user_id: str) -> list:
    """
    Reads all quiz scores for a given user from BigQuery.
    
    Args:
        user_id: The Firebase UID of the student.
        
    Returns:
        list: A list of dicts containing the user's score records.
    """
    print(f"[AnalyticalMemory] Reading quiz scores for user: {user_id}")
    try:
        client = get_bigquery_client()
        table_ref = f"{PROJECT_ID}.{DATASET_ID}.{TABLE_ID}"
        
        query = f"""
            SELECT user_id, topic_name, score, timestamp
            FROM `{table_ref}`
            WHERE user_id = @user_id
            ORDER BY timestamp DESC
        """
        
        job_config = bigquery.QueryJobConfig(
            query_parameters=[
                bigquery.ScalarQueryParameter("user_id", "STRING", user_id)
            ]
        )
        
        query_job = client.query(query, job_config=job_config)
        results = query_job.result()
        
        scores = []
        for row in results:
            # Format timestamp as ISO format string
            ts_str = row.timestamp.isoformat() if row.timestamp else ""
            scores.append({
                "user_id": row.user_id,
                "topic_name": row.topic_name,
                "score": row.score,
                "timestamp": ts_str
            })
            
        print(f"[AnalyticalMemory] Read {len(scores)} records.")
        return scores
    except Exception as e:
        print(f"[AnalyticalMemory] BigQuery read failed: {e}")
        return []
