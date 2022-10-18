import fs from "fs";
import { parse } from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategories {
  name: string,
  description: string,
};

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategories[] = [];
      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          categories.push({
            name,
            description
          });
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    
    categories.map( async (category) => {
      const { name, description } = category;

      const categoryExist = this.categoriesRepository.findByName(name);

      if(!categoryExist) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
};

export { ImportCategoryUseCase };