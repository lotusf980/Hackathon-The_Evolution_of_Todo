#!/usr/bin/env python3
"""
Main entry point for the Todo Console Application.
"""

from .services.task_service import TaskService
from .cli.console_interface import ConsoleInterface


def main():
    """
    Main function to run the Todo Console Application.
    """
    print("Initializing Todo Console Application...")

    # Create the task service
    task_service = TaskService()

    # Create the console interface
    console_interface = ConsoleInterface(task_service)

    # Run the application
    console_interface.run()


if __name__ == "__main__":
    main()