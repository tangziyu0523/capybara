from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_login():
    response = client.post(
        "/api/v1/login",
        data={"username": "admin", "password": "admin123"},
    )
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

def test_login_invalid():
    response = client.post(
        "/api/v1/login",
        data={"username": "admin", "password": "wrongpassword"},
    )
    assert response.status_code == 401
