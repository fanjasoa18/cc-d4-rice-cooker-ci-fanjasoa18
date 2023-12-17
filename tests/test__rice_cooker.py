import unittest
from unittest.mock import patch
from unittest import mock
from rice_cooker import RiceCooker


class TestRiceCooker(unittest.TestCase):

    # ADD WATER
    def setUp(self):
        self.rice_cooker = RiceCooker()

    def test_init(self):
        rice_cooker = RiceCooker()
        self.assertEqual(rice_cooker.water_level, 0)

    @patch('builtins.print')
    def test_add_water_ok(self, mock_print):
        rice_cooker = RiceCooker()

        # Cas d'ajout d'une quantité d'eau correcte
        rice_cooker.add_water(1)
        self.assertEqual(rice_cooker.water_level, 1)
        mock_print.assert_called_with("1 litre(s) d'eau ajouté(s).")

    @patch('builtins.print')
    def test_add_water_exceeding_capacity(self, mock_print):
        rice_cooker = RiceCooker()
        # Cas d'ajout d'une quantité d'eau dépassant la capacité maximale
        rice_cooker.add_water(3)
        self.assertEqual(rice_cooker.water_level, 0)
        mock_print.assert_called_with(
            "Capacité maximale du Rice Cooker atteinte (2 litres)."
        )

    # BOIL_WATER

    @patch('timer.Timer.run_timer')
    @patch('builtins.input')
    def test_boil_water_1(self, mock_print, mock_timer_run_timer):
        self.rice_cooker.boil_water(1)
        self.assertEqual(self.rice_cooker.water_level, 1)
        mock_timer_run_timer.assert_called_once_with(3)

    @patch('timer.Timer.run_timer')
    @patch('builtins.print')
    def test_boil_water_2(self, mock_print, mock_timer_run_timer):
        self.rice_cooker.boil_water(2)
        self.assertEqual(self.rice_cooker.water_level, 2)
        mock_timer_run_timer.assert_called_once_with(5)

    # COOK RICE TESTS

    def test_cook_rice_valid_input(self):
        with mock.patch('builtins.input', side_effect=['1', '1']), \
             mock.patch('timer.Timer.run_timer'), \
             mock.patch('builtins.print') as mock_print:
            self.rice_cooker.cook_rice('1')

        mock_print.assert_has_calls([
            mock.call("Ajoutez de l'eau d'abord."),
            mock.call("1.0 litre(s) d'eau ajouté(s)."),
            mock.call("Le riz blanc cuit pendant 7 secondes."),
            mock.call("Le RiceCooker est en train de cuire votre riz blanc"),
            mock.call("Le riz blanc est cuit.")
        ])
        self.assertEqual(self.rice_cooker.water_level, 1)

    @patch('builtins.input', side_effect=['0', '1'])
    @patch('timer.Timer.run_timer')
    @patch('builtins.print')
    def test_cook_rice_invalid_water_quantity(
            self, mock_print, mock_timer_run_timer, mock_input
    ):
        with patch('builtins.input', side_effect=['0']):
            self.rice_cooker.cook_rice('1')

        mock_print.assert_called_with(
            "Quantité d'eau non valide.Assurez-vous que la quantité"
            " est comprise entre 0 et 2 litres."
        )
        mock_timer_run_timer.assert_not_called()
        self.assertEqual(self.rice_cooker.water_level, 0)

    @patch('builtins.input', side_effect=['3', '1'])
    @patch('builtins.print')
    def test_cook_rice_invalid_rice_type(self, mock_print, mock_input):
        self.rice_cooker.cook_rice('Invalid_type')

        mock_print.assert_called_with("Le riz blanc est cuit.")


if __name__ == '__main__':
    unittest.main()
