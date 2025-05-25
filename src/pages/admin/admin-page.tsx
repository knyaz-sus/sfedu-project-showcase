import { Footer } from "@/shared/layout/components/footer";
import { Tag, University, Calendar, Edit, File } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Link } from "react-router-dom";

export function AdminPage() {
  return (
    <>
      <div className="min-h-svh p-6 space-y-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Панель администратора
          </h1>
          <p className="text-muted-foreground">
            Выберите раздел управления данными
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="cursor-pointer transition-all hover:shadow-md hover:scale-105 active:scale-95">
            <Link to="tags">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                  <Tag className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg">Изменить теги</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Управление тегами проектов
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="cursor-pointer transition-all hover:shadow-md hover:scale-105 active:scale-95">
            <Link to="dates">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                  <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-lg">Изменить даты</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Управление датами проектов
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="cursor-pointer transition-all hover:shadow-md hover:scale-105 active:scale-95">
            <Link to="tracks">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                  <University className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-lg">Изменить треки</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Управление учебными треками
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="cursor-pointer transition-all hover:shadow-md hover:scale-105 active:scale-95">
            <Link to="project-editor">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900">
                  <Edit className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="text-lg">
                  Перейти в редактор проектов
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Создание нового проекта
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="cursor-pointer transition-all hover:shadow-md hover:scale-105 active:scale-95">
            <Link to="primary-filling">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900">
                  <File className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle className="text-lg">
                  Загрузить проекты из файлов
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Загрузить проекты из csv или xlsx файлов
                </p>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
