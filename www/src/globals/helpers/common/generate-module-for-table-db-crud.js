// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pluralize = require('pluralize');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const readline = require('readline');

// settings
const tab = '  ';

// additionals functions
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function confirmContinue() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question('Do you want to continue despite the error? (yes/no): ', (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'yes');
    });
  });
}

function generateCreateDtoFile(singularName, dtoPath) {
  const importStatement = `import {  } from "class-validator";\n\n`;
  const classDefinition = `export class Create${capitalizeFirstLetter(singularName)}Dto {\n` +
  `${tab}// TODO:\n` +
  `}`;

  const content = importStatement + classDefinition;
  fs.writeFileSync(path.join(dtoPath, `create-${singularName}.dto.ts`), content);
}

function generateRequestByQueryParamsDtoFile(singularName, dtoPath) {
  const importStatements = 
  `import { PartialType } from '@nestjs/mapped-types';\n` +
  `import { IsOptional, IsInt, IsNotEmpty } from 'class-validator';\n` +
  `import { Create${capitalizeFirstLetter(singularName)}Dto } from './create-${singularName}.dto';\n\n`;

  const classDefinition = 
  `export class RequestByQueryParams${capitalizeFirstLetter(singularName)}Dto extends PartialType(Create${capitalizeFirstLetter(singularName)}Dto) {\n` +
  `${tab}@IsOptional()\n` +
  `${tab}@IsNotEmpty()\n` +
  `${tab}@IsInt()\n` +
  `${tab}id?: number;\n` +
  `}`;

  const content = importStatements + classDefinition;
  fs.writeFileSync(path.join(dtoPath, `requestByQueryParams-${singularName}.dto.ts`), content);
}

function generateUpdateDtoFile(singularName, dtoPath) {
  const importStatement = 
  `import { PartialType } from '@nestjs/mapped-types';\n` +
  `import { Create${capitalizeFirstLetter(singularName)}Dto } from './create-${singularName}.dto';\n\n`;

  const classDefinition = 
  `export class Update${capitalizeFirstLetter(singularName)}Dto extends PartialType(Create${capitalizeFirstLetter(singularName)}Dto) {}`;

  const content = importStatement + classDefinition;
  fs.writeFileSync(path.join(dtoPath, `update-${singularName}.dto.ts`), content);
}

function generateControllerFile(singularName, pluralName, modulePath) {
  const singularCapitalized = capitalizeFirstLetter(singularName);
  const pluralCapitalized = capitalizeFirstLetter(pluralName);

  let content = `import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ParseIntPipe } from '@nestjs/common';\n`;
  content += `import { ${pluralCapitalized}Service } from './${pluralName}.service';\n`;
  content += `import { Create${singularCapitalized}Dto } from './dto/create-${singularName}.dto';\n`;
  content += `import { RequestByQueryParams${singularCapitalized}Dto } from './dto/requestByQueryParams-${singularName}.dto';\n`;
  content += `import { Update${singularCapitalized}Dto } from './dto/update-${singularName}.dto';\n`;
  content += `import { ApiTags } from '@nestjs/swagger';\n`;
  content += `import { ValidationQueryParamsPipe } from 'src/modules/http/decorators/validation-query-params.decorator';\n`;
  content += `import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';\n\n`;

  content += `@ApiTags('${pluralName}')\n`;
  content += `@Controller('${pluralName}')\n`;
  content += `export class ${pluralCapitalized}Controller {\n`;
  content += `${tab}constructor(private readonly ${pluralName}Service: ${pluralCapitalized}Service) {}\n\n`;
  
  content += `${tab}@Post()\n`;
  content += `${tab}create(@Body() create${singularCapitalized}Dto: Create${singularCapitalized}Dto) {\n`;
  content += `${tab}${tab}return this.${pluralName}Service.create(create${singularCapitalized}Dto);\n`;
  content += `${tab}}\n\n`;

  content += `${tab}@Get()\n`;
  content += `${tab}findAll() {\n`;
  content += `${tab}${tab}return this.${pluralName}Service.findAll();\n`;
  content += `${tab}}\n\n`;

  content += `${tab}@Get('getAll')\n`;
  content += `${tab}@UsePipes(new ValidationQueryParamsPipe(RequestByQueryParams${singularCapitalized}Dto))\n`;
  content += `${tab}findAllByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {\n`;
  content += `${tab}${tab}return this.${pluralName}Service.findAllByQueryParams(queryParams);\n`;
  content += `${tab}}\n\n`;

  content += `${tab}@Get('getOne')\n`;
  content += `${tab}@UsePipes(new ValidationQueryParamsPipe(RequestByQueryParams${singularCapitalized}Dto))\n`;
  content += `${tab}findOneByQueryParams(@Query() queryParams: HttpQueryParamsFromUrl) {\n`;
  content += `${tab}${tab}return this.${pluralName}Service.findOneByQueryParams(queryParams);\n`;
  content += `${tab}}\n\n`;

  content += `${tab}@Get(':id')\n`;
  content += `${tab}findOneById(@Param('id', ParseIntPipe) id: number) {\n`;
  content += `${tab}${tab}return this.${pluralName}Service.findOneById(id);\n`;
  content += `${tab}}\n\n`;

  content += `${tab}@Patch(':id')\n`;
  content += `${tab}update(@Param('id', ParseIntPipe) id: number, @Body() update${singularCapitalized}Dto: Update${singularCapitalized}Dto) {\n`;
  content += `${tab}${tab}return this.${pluralName}Service.update(id, update${singularCapitalized}Dto);\n`;
  content += `${tab}}\n\n`;

  content += `${tab}@Delete(':id')\n`;
  content += `${tab}remove(@Param('id', ParseIntPipe) id: number) {\n`;
  content += `${tab}${tab}return this.${pluralName}Service.remove(id);\n`;
  content += `${tab}}\n`;

  content += `}`;

  fs.writeFileSync(path.join(modulePath, `${pluralName}.controller.ts`), content);
}

function generateModuleFile(pluralName, modulePath) {
  const pluralCapitalized = capitalizeFirstLetter(pluralName);

  let content = `import { Module } from '@nestjs/common';\n`;
  content += `import { ${pluralCapitalized}Service } from './${pluralName}.service';\n`;
  content += `import { ${pluralCapitalized}Controller } from './${pluralName}.controller';\n`;
  content += `import { PrismaService } from '../../prisma.service';\n`;
  content += `import { HttpErrorService } from 'src/modules/http/services/http-error.service';\n`;
  content += `import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';\n\n`;

  content += `@Module({\n`;
  content += `${tab}controllers: [${pluralCapitalized}Controller],\n`;
  content += `${tab}providers: [${pluralCapitalized}Service, PrismaService, HttpErrorService, TransformToQueryPrisma],\n`;
  content += `})\n`;
  content += `export class ${pluralCapitalized}Module {}`;

  fs.writeFileSync(path.join(modulePath, `${pluralName}.module.ts`), content);
}

function generateServiceFile(singularName, pluralName, modulePath) {
  const singularCapitalized = capitalizeFirstLetter(singularName);
  const pluralCapitalized = capitalizeFirstLetter(pluralName);

  let content = `import { Injectable } from '@nestjs/common';\n`;
  content += `import { Create${singularCapitalized}Dto } from './dto/create-${singularName}.dto';\n`;
  content += `import { Update${singularCapitalized}Dto } from './dto/update-${singularName}.dto';\n`;
  content += `import { PrismaService } from '../../prisma.service';\n`;
  content += `import { HttpErrorService } from 'src/modules/http/services/http-error.service';\n`;
  content += `import { TransformToQueryPrisma } from 'src/modules/http/services/transform-to-query-prisma.service';\n`;
  content += `import { HttpQueryParamsFromUrl } from 'src/modules/http/types/http.types';\n\n`;

  content += `@Injectable()\n`;
  content += `export class ${pluralCapitalized}Service {\n`;
  content += `${tab}constructor(\n`;
  content += `${tab}${tab}private readonly prismaService: PrismaService,\n`;
  content += `${tab}${tab}private readonly httpErrorService: HttpErrorService,\n`;
  content += `${tab}${tab}private readonly transformToQueryPrisma: TransformToQueryPrisma\n`;
  content += `${tab}) {}\n\n`;

  content += `${tab}async create(create${singularCapitalized}Dto: Create${singularCapitalized}Dto) {\n`;
  content += `${tab}${tab}try {\n`;
  content += `${tab}${tab}${tab}const new${singularCapitalized} = await this.prismaService.${pluralName}.create({ data: create${singularCapitalized}Dto });\n`;
  content += `${tab}${tab}${tab}return new${singularCapitalized};\n`;
  content += `${tab}${tab}} catch (error) {\n`;
  content += `${tab}${tab}${tab}this.httpErrorService.handleError(error);\n`;
  content += `${tab}${tab}}\n`;
  content += `${tab}}\n\n`;

  content += `${tab}async findAll() {\n`;
  content += `${tab}${tab}try {\n`;
  content += `${tab}${tab}${tab}const ${pluralName} = await this.prismaService.${pluralName}.findMany();\n`;
  content += `${tab}${tab}${tab}return ${pluralName};\n`;
  content += `${tab}${tab}} catch (error) {\n`;
  content += `${tab}${tab}${tab}this.httpErrorService.handleError(error);\n`;
  content += `${tab}${tab}}\n`;
  content += `${tab}}\n\n`;

  content += `${tab}async findAllByQueryParams(queryParams: HttpQueryParamsFromUrl) {\n`;
  content += `${tab}${tab}try {\n`;
  content += `${tab}${tab}${tab}const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);\n`;
  content += `${tab}${tab}${tab}const ${pluralName} = await this.prismaService.${pluralName}.findMany(queryForPrisma);\n`;
  content += `${tab}${tab}${tab}return ${pluralName};\n`;
  content += `${tab}${tab}} catch (error) {\n`;
  content += `${tab}${tab}${tab}this.httpErrorService.handleError(error);\n`;
  content += `${tab}${tab}}\n`;
  content += `${tab}}\n\n`;

  content += `${tab}async findOneByQueryParams(queryParams: HttpQueryParamsFromUrl) {\n`;
  content += `${tab}${tab}try {\n`;
  content += `${tab}${tab}${tab}const queryForPrisma = this.transformToQueryPrisma.fromQueryParams(queryParams);\n`;
  content += `${tab}${tab}${tab}const ${singularName} = await this.prismaService.${pluralName}.findFirst(queryForPrisma);\n`;
  content += `${tab}${tab}${tab}return ${singularName};\n`;
  content += `${tab}${tab}} catch (error) {\n`;
  content += `${tab}${tab}${tab}this.httpErrorService.handleError(error);\n`;
  content += `${tab}${tab}}\n`;
  content += `${tab}}\n\n`;

  content += `${tab}async findOneById(id: number) {\n`;
  content += `${tab}${tab}try {\n`;
  content += `${tab}${tab}${tab}const ${singularName} = await this.prismaService.${pluralName}.findUnique({ where: { id } });\n`;
  content += `${tab}${tab}${tab}return ${singularName};\n`;
  content += `${tab}${tab}} catch (error) {\n`;
  content += `${tab}${tab}${tab}this.httpErrorService.handleError(error);\n`;
  content += `${tab}${tab}}\n`;
  content += `${tab}}\n\n`;

  content += `${tab}async update(id: number, update${singularCapitalized}Dto: Update${singularCapitalized}Dto) {\n`;
  content += `${tab}${tab}try {\n`;
  content += `${tab}${tab}${tab}const updated${singularCapitalized} = await this.prismaService.${pluralName}.update({ where: { id }, data: update${singularCapitalized}Dto });\n`;
  content += `${tab}${tab}${tab}return updated${singularCapitalized};\n`;
  content += `${tab}${tab}} catch (error) {\n`;
  content += `${tab}${tab}${tab}this.httpErrorService.handleError(error);\n`;
  content += `${tab}${tab}}\n`;
  content += `${tab}}\n\n`;

  content += `${tab}async remove(id: number) {\n`;
  content += `${tab}${tab}try {\n`;
  content += `${tab}${tab}${tab}const deleted${singularCapitalized} = await this.prismaService.${pluralName}.delete({ where: { id } });\n`;
  content += `${tab}${tab}${tab}return deleted${singularCapitalized};\n`;
  content += `${tab}${tab}} catch (error) {\n`;
  content += `${tab}${tab}${tab}this.httpErrorService.handleError(error);\n`;
  content += `${tab}${tab}}\n`;
  content += `${tab}}\n`;

  content += `}`;
  
  fs.writeFileSync(path.join(modulePath, `${pluralName}.service.ts`), content);
}

// Main generator
async function generateModuleForTableDbCrud(singularName, pluralName, pathToModule) {
  // Checking the validity and compliance of singularName and pluralName
  if (!/^[a-zA-Z]+$/.test(singularName) || !/^[a-zA-Z]+$/.test(pluralName)) {
    console.error('Error: singularName and pluralName must be valid English words.');
    process.exit(1);
  }

  if (pluralize.isPlural(singularName) || !pluralize.isPlural(pluralName) || pluralize.singular(pluralName) !== singularName) {
    console.error(`Error: pluralName must be the correct plural form of singularName.\n`);

    const continueGenerating = await confirmContinue();
    if (!continueGenerating) {
      process.exit(1);
    }
  }

  // Checking that singularName and pluralName are not equal 
  if (singularName === pluralName) {
    console.error('Error: singularName and pluralName must not be equal.');
    process.exit(1);
  }

  const pluralCapitalized = capitalizeFirstLetter(pluralName);
  const modulePath = path.join(pathToModule, pluralName);
  const dtoPath = path.join(modulePath, 'dto');

  // Checkint that a module does not exist
  if (fs.existsSync(modulePath)) {
    console.error(`Error: Module "${pluralName}" already exists in "${pathToModule}".`);
    process.exit(1);
  }

  // Creating a folder for files
  if (!fs.existsSync(modulePath)) fs.mkdirSync(modulePath, { recursive: true });
  if (!fs.existsSync(dtoPath)) fs.mkdirSync(dtoPath, { recursive: true });

  // Generating files
  generateCreateDtoFile(singularName, dtoPath);
  generateRequestByQueryParamsDtoFile(singularName, dtoPath);
  generateUpdateDtoFile(singularName, dtoPath);
  generateControllerFile(singularName, pluralName, modulePath);
  generateModuleFile(pluralName, modulePath);
  generateServiceFile(singularName, pluralName, modulePath);

  console.log(`Module ${pluralCapitalized} successfully created in ${modulePath}`);
}

const args = process.argv.slice(2);

if (args.length !== 3) {
  console.error('It is necessary to specify three arguments: singular name, plural name, and the path to the module.');
  process.exit(1);
}

const [singularName, pluralName, pathToModule] = args;
generateModuleForTableDbCrud(singularName, pluralName, pathToModule);