import unittest
from unittest.mock import patch
from timer import Timer


class TestTimer(unittest.TestCase):
    @patch('builtins.print')
    @patch('time.sleep', return_value=None)
    def test_run_timer_with_positive_seconds(self, mock_sleep, mock_print):
        timer = Timer()

        # Cas de base : le timer s'exécute correctement
        timer.run_timer(5)
        # Vérifie que sleep a été appelé correctement
        mock_sleep.assert_called_with(1)
        # Vérifie que print a été appelé 6 fois (boucle de 0 à 5 inclus)
        self.assertEqual(mock_print.call_count, 7)

    @patch('builtins.print')
    @patch('time.sleep', return_value=None)
    def test_run_timer_with_zero_seconds(self, mock_sleep, mock_print):
        timer = Timer()

        # Cas où le timer est appelé avec 0 secondes
        timer.run_timer(0)
        # Vérifie que sleep n'est pas appelé
        mock_sleep.assert_not_called()
        # Vérifie que print n'est pas appelé
        self.assertEqual(mock_print.call_count, 0)


if __name__ == '__main__':
    unittest.main()
