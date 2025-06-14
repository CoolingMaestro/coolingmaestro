import { supabase, TABLES } from '../config/supabase.js';

// Proje kaydet
export const saveProject = async (req, res, next) => {
  try {
    const projectData = req.body;
    
    const { data, error } = await supabase
      .from(TABLES.PROJECTS)
      .insert([{
        ...projectData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) throw error;
    
    res.status(201).json({
      success: true,
      data,
      message: 'Proje başarıyla kaydedildi'
    });
  } catch (error) {
    next(error);
  }
};

// Tüm projeleri getir
export const getProjects = async (req, res, next) => {
  try {
    const { data, error, count } = await supabase
      .from(TABLES.PROJECTS)
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    res.json({
      success: true,
      data,
      count
    });
  } catch (error) {
    next(error);
  }
};

// Belirli bir projeyi getir
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from(TABLES.PROJECTS)
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          success: false,
          error: 'Proje bulunamadı'
        });
      }
      throw error;
    }
    
    res.json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
};

// Projeyi sil
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from(TABLES.PROJECTS)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    res.json({
      success: true,
      message: 'Proje başarıyla silindi'
    });
  } catch (error) {
    next(error);
  }
};