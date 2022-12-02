SERVE_DIR=dist

default: help
	
install: ## Install the dependencies required to build the document
	npm install

serve: ## Start the HTTP server
	npx serve -C $(SERVE_DIR)

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m- %-20s\033[0m %s\n", $$1, $$2}'
