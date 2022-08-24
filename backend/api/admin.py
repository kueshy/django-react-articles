from django.contrib import admin
from .models import Article

# Register your models here.
# class ArticleAdmin(admin.ModelAdmin):
#     list = ('title', 'description')

# admin.site.register(Article, ArticleAdmin)

@admin.register(Article)
class ArticleModel(admin.ModelAdmin):
    list_filter = ('title', 'description')
    list_display = ('title', 'description')
