import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LogInCredentialsDto } from './dto/log-in-credentials.dto';
import { RecipeDto } from './dto/recipe.dto';
import { AuthGuard } from './guards/AuthGuard';
import { FileInterceptor } from "@nestjs/platform-express";
import { AppGateway } from './app.gateway';
import { firstValueFrom, from, Subject } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly appGateway: AppGateway,
  ) {}

  // auth ------------------------------------------------------------

  @Post('/signUp')
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
    console.log(authCredentialsDto);
    return this.appService.signUp(authCredentialsDto);
  }

  @Post('/logIn')
  async logIn(
    @Body() logInCredentialsDto: LogInCredentialsDto,
  ): Promise<{ userId: string; accessToken: string }> {
    console.log(logInCredentialsDto)
    return this.appService.logIn(logInCredentialsDto);
  }

  // recipes ---------------------------------------------------------

  @UseGuards(AuthGuard)
  @Post('/recipes')
  async createRecipe(@Body() createRecipeDto: RecipeDto, @Res() res) {
    console.log(createRecipeDto)
    await this.appService.createRecipe(createRecipeDto)
    .then((recipe) => {
      console.log(recipe)
      this.appGateway.server.emit('new_recipe', recipe);
      
      return res.status(HttpStatus.OK).json({
        message: "New recipe created.",
        recipe: recipe,
      })
    })
  }

  @UseGuards(AuthGuard)
  @Post('/upload-image')
  @UseInterceptors(FileInterceptor("file", { dest: "./uploads" }))
  async UploadImage(@UploadedFile() file) {
    console.log(file)
    return file.filename
  }

  @Get('/recipes')
  async getRecipes(@Query() filterDto) {
    console.log(filterDto)
    return this.appService.getRecipes(filterDto);
  }

  @Get('images/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'uploads'});
  }

  @Get('/recipes/:id')
  async getRecipeById(@Param('id') id: string) {
    return this.appService.getRecipeById(id);
  }

// mailer ----------------------------------------------------------
  @UseGuards(AuthGuard)
  @Post('/send-mail')
  async sendMail(@Body() mailDto) {
    return this.appService.sendMail(mailDto);
  }
}
