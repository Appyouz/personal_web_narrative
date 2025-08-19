from django.contrib import admin
from .models import Memory, MemoryImage, AppreciationImage, ChapterMusic

class MemoryImageInline(admin.StackedInline):
    model = MemoryImage
    extra = 1

class MemoryAdmin(admin.ModelAdmin):
    inlines = [MemoryImageInline]

admin.site.register(Memory, MemoryAdmin)
admin.site.register(AppreciationImage)
admin.site.register(ChapterMusic)
