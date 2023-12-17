from timer import Timer


class RiceCooker:
    def __init__(self):
        self.water_level = 0

    def add_water(self, amount):
        max_capacity = 2
        if self.water_level + amount > max_capacity:
            print(
                "Capacité maximale du Rice Cooker atteinte "
                f"({max_capacity} litres)."
            )
        else:
            self.water_level += amount
            print(f"{amount} litre(s) d'eau ajouté(s).")

    def boil_water(self, water_quantity_choice, input_function=input):
        max_capacity = 2

        try:
            water_quantity_choice = float(water_quantity_choice)
        except ValueError:
            new_quantity = float(
                input_function(
                    "Veuillez entrer une valeur numérique valide : ")
                )
            self.boil_water(new_quantity)
            return

        if water_quantity_choice == 0:
            print("Ajoutez de l'eau d'abord.")
            new_quantity = float(
                input_function("Entrez une nouvelle quantité d'eau : "))
            self.boil_water(new_quantity)
            return

        if water_quantity_choice < 0:
            print("Choix de quantité d'eau non valide.")
            new_quantity = float(
                input_function("Entrez une nouvelle quantité d'eau : "))
            self.boil_water(new_quantity)
            return

        if water_quantity_choice > max_capacity:
            new_quantity = float(
                input_function("Entrez une nouvelle quantité d'eau : "))
            self.boil_water(new_quantity)
            return

        self.water_level += water_quantity_choice

        if water_quantity_choice == max_capacity:
            print(
                "Attention : Vous avez atteint la capacité"
                "maximale du Rice Cooker (2 litres).")
            boiling_times = {2: 5}
            boiling_time = boiling_times.get(water_quantity_choice)
            if boiling_time is not None:
                print(f"L'eau bout pendant {boiling_time} secondes.")
                print("Le Rice Cooker est en train de bouillir de l'eau.")
                Timer.run_timer(boiling_time)
                print("L'eau est bouillie.")
            else:
                print("Choix de quantité d'eau non valide.")

        boiling_times = {1: 3}
        boiling_time = boiling_times.get(water_quantity_choice)

        if boiling_time is not None:
            print(f"L'eau bout pendant {boiling_time} secondes.")
            print("Le Rice Cooker est en train de bouillir de l'eau.")
            Timer.run_timer(boiling_time)
            print("L'eau est bouillie.")
        else:
            print("Choix de quantité d'eau non valide.")

    def cook_rice(self, rice_type, input_function=input):
        if self.water_level == 0:
            print("Ajoutez de l'eau d'abord.")
            water_quantity = float(
                            input_function(
                                "Entrez la quantité d'eau "
                                "(en litres, ne dépassez pas "
                                "2 litres) : ")
                            )
        if 0 < water_quantity <= 2:
            self.add_water(water_quantity)
        else:
            print(
                "Quantité d'eau non valide."
                "Assurez-vous que la quantité est comprise "
                "entre 0 et 2 litres.")
            return

        cooking_times = {"1": 7, "2": 10}

        while True:
            if rice_type == '1':
                rice_type_display = 'riz blanc'
                break
            elif rice_type == '2':
                rice_type_display = 'riz brun'
                break
            else:
                print(
                    "Choix non valide. Veuillez choisir '1' pour"
                    "'riz blanc' ou '2' pour 'riz brun'.")
            rice_type = input_function("Entrez à nouveau le type de riz : ")

        cooking_time = cooking_times[rice_type]
        rice_type_display = 'riz blanc' if rice_type == '1' else 'riz brun'
        print(f"Le {rice_type_display} cuit pendant {cooking_time} secondes.")
        print(f"Le RiceCooker est en train de cuire votre {rice_type_display}")
        Timer.run_timer(cooking_time)
        print(f"Le {rice_type_display} est cuit.")
