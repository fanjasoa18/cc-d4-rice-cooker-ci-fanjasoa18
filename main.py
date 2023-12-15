from rice_cooker import RiceCooker


def main():
    rice_cooker = RiceCooker()
    try:

        while True:
            print("\nMenu:")
            print("1 - Faire bouillir de l'eau")
            print("2 - Cuisiner du riz")
            print("0 - Quitter")

            choice = input("Choisissez une option : ")

            if choice == "1":
                water_quantity_choice = input(
                        "Choisissez la quantité d'eau"
                        "(1 pour 1 litre, 2 pour 2 litres) : ")
                rice_cooker.boil_water(water_quantity_choice)

            elif choice == "2":
                rice_type = input(
                    "Choisissez le type de riz (1(riz blanc) / 2(riz brun) : ")
                rice_cooker.cook_rice(rice_type)

            elif choice == "0":
                print("Au revoir !")
                break

            else:
                print("Option non valide. Veuillez choisir à nouveau.")

    except KeyboardInterrupt:
        print("\nProgramme interrompu par l'utilisateur. Au revoir!")


if __name__ == "__main__":
    main()
