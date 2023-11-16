import pygame
import sys
import random

# Initialize Pygame
pygame.init()

# Constants
WIDTH, HEIGHT = 300, 300
ROWS, COLS = 3, 3
TILE_SIZE = WIDTH // COLS

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

# Initialize the screen
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Sliding Puzzle")

# Function to draw the puzzle
def draw_puzzle(puzzle):
    for row in range(ROWS):
        for col in range(COLS):
            value = puzzle[row][col]
            if value:
                pygame.draw.rect(screen, WHITE, (col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE))
                font = pygame.font.Font(None, 36)
                text = font.render(str(value), True, BLACK)
                text_rect = text.get_rect(center=(col * TILE_SIZE + TILE_SIZE // 2, row * TILE_SIZE + TILE_SIZE // 2))
                screen.blit(text, text_rect)

# Function to shuffle the puzzle
def shuffle_puzzle():
    puzzle = [[0] * COLS for _ in range(ROWS)]
    numbers = list(range(1, ROWS * COLS + 1))
    random.shuffle(numbers)

    for row in range(ROWS):
        for col in range(COLS):
            puzzle[row][col] = numbers.pop()

    return puzzle

# Main game loop
def main():
    puzzle = shuffle_puzzle()
    empty_tile = (ROWS - 1, COLS - 1)

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_UP and empty_tile[0] < ROWS - 1:
                    puzzle[empty_tile[0]][empty_tile[1]], puzzle[empty_tile[0] + 1][empty_tile[1]] = \
                        puzzle[empty_tile[0] + 1][empty_tile[1]], puzzle[empty_tile[0]][empty_tile[1]]
                    empty_tile = (empty_tile[0] + 1, empty_tile[1])
                elif event.key == pygame.K_DOWN and empty_tile[0] > 0:
                    puzzle[empty_tile[0]][empty_tile[1]], puzzle[empty_tile[0] - 1][empty_tile[1]] = \
                        puzzle[empty_tile[0] - 1][empty_tile[1]], puzzle[empty_tile[0]][empty_tile[1]]
                    empty_tile = (empty_tile[0] - 1, empty_tile[1])
                elif event.key == pygame.K_LEFT and empty_tile[1] < COLS - 1:
                    puzzle[empty_tile[0]][empty_tile[1]], puzzle[empty_tile[0]][empty_tile[1] + 1] = \
                        puzzle[empty_tile[0]][empty_tile[1] + 1], puzzle[empty_tile[0]][empty_tile[1]]
                    empty_tile = (empty_tile[0], empty_tile[1] + 1)
                elif event.key == pygame.K_RIGHT and empty_tile[1] > 0:
                    puzzle[empty_tile[0]][empty_tile[1]], puzzle[empty_tile[0]][empty_tile[1] - 1] = \
                        puzzle[empty_tile[0]][empty_tile[1] - 1], puzzle[empty_tile[0]][empty_tile[1]]
                    empty_tile = (empty_tile[0], empty_tile[1] - 1)

        screen.fill(BLACK)
        draw_puzzle(puzzle)
        pygame.display.flip()

if __name__ == "__main__":
    main()
