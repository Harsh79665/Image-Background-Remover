@echo off
echo ==============================================
echo   AI Background Remover - Automated Setup
echo ==============================================
echo.

echo [1/3] Setting up Virtual Environment...
:: Try using Python 3.12 if the launcher is available, otherwise fallback to default python
py -3.12 -m venv venv >nul 2>&1
if %errorlevel% neq 0 (
    python.exe -m venv venv
)

:: Check if venv was created successfully
if not exist "venv\Scripts\activate.bat" (
    echo [ERROR] Failed to create virtual environment. 
    echo Please make sure Python is installed and added to your PATH.
    pause
    exit /b 1
)

echo [2/3] Activating environment and installing dependencies...
call venv\Scripts\activate.bat
:: Upgrade pip first to avoid warnings
python -m pip install --upgrade pip >nul 2>&1
:: Install required libraries
pip install flask flask-cors "rembg[cli]" pillow onnxruntime

echo.
echo [3/3] Starting Server...
echo (NOTE: On the first run, it might take 1-2 minutes to download the AI model.)
echo ==============================================
python app.py

pause
