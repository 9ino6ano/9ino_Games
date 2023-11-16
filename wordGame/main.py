import random

def generate_grid(rows, cols):
    alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    grid = [[random.choice(alphabet) for _ in range(cols)] for _ in range(rows)]
    return grid

def place_word(grid, word):
    directions = [(0, 1), (1, 0), (1, 1), (1, -1)]  # horizontal, vertical, diagonal, reverse diagonal

    for _ in range(10):  # Attempt to place the word up to 10 times
        direction = random.choice(directions)
        row = random.randint(0, len(grid) - 1)
        col = random.randint(0, len(grid[0]) - 1)

        if (
            0 <= row + (len(word) - 1) * direction[0] < len(grid) and
            0 <= col + (len(word) - 1) * direction[1] < len(grid[0])
        ):
            valid = True
            for i in range(len(word)):
                if grid[row + i * direction[0]][col + i * direction[1]] != ' ' and grid[row + i * direction[0]][col + i * direction[1]] != word[i]:
                    valid = False
                    break

            if valid:
                for i in range(len(word)):
                    grid[row + i * direction[0]][col + i * direction[1]] = word[i]
                return True

    return False

def fill_grid(grid):
    words = ['PYTHON', 'WORD', 'SEARCH', 'GRID', 'PUZZLE']
    for word in words:
        placed = False
        while not placed:
            placed = place_word(grid, word)

def display_grid(grid):
    for row in grid:
        print(' '.join(row))
    print()

def play_game(grid):
    found_words = set()

    while True:
        display_grid(grid)
        guess = input("Enter a word (or 'exit' to quit): ").upper()

        if guess == 'EXIT':
            break

        if guess in found_words:
            print("You already found that word!")
        elif check_word(grid, guess):
            found_words.add(guess)
            print(f"Found {guess}! ({len(found_words)}/{len(get_all_words(grid))} words found)")
        else:
            print("Not found. Try again.")

    print("Thanks for playing!")

def check_word(grid, word):
    directions = [(0, 1), (1, 0), (1, 1), (1, -1)]

    for direction in directions:
        for row in range(len(grid)):
            for col in range(len(grid[0])):
                if (
                    0 <= row + (len(word) - 1) * direction[0] < len(grid) and
                    0 <= col + (len(word) - 1) * direction[1] < len(grid[0])
                ):
                    found = True
                    for i in range(len(word)):
                        if grid[row + i * direction[0]][col + i * direction[1]] != word[i]:
                            found = False
                            break
                    if found:
                        return True

    return False

def get_all_words(grid):
    words = set()
    directions = [(0, 1), (1, 0), (1, 1), (1, -1)]

    for direction in directions:
        for row in range(len(grid)):
            for col in range(len(grid[0])):
                for length in range(2, len(grid) + 1):
                    if (
                        0 <= row + (length - 1) * direction[0] < len(grid) and
                        0 <= col + (length - 1) * direction[1] < len(grid[0])
                    ):
                        words.add(''.join([grid[row + i * direction[0]][col + i * direction[1]] for i in range(length)]))

    return words

def main():
    rows, cols = 10, 10
    word_search_grid = [[' ' for _ in range(cols)] for _ in range(rows)]

    fill_grid(word_search_grid)
    play_game(word_search_grid)

if __name__ == "__main__":
    main()
