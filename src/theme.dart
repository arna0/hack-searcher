import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

/// A custom futuristic dark theme for Flutter applications.
/// 
/// Senior Flutter Developer & UI/UX Expert curated.
class FuturisticTheme {
  // Brand Colors
  static const Color background = Color(0xFF0D0D12);
  static const Color surface = Color(0xFF16161E);
  static const Color primary = Color(0xFF6366F1); // Indigo
  static const Color secondary = Color(0xFF22D3EE); // Cyan
  static const Color accent = Color(0xFF818CF8);
  static const Color textMain = Color(0xFFF9FAFB);
  static const Color textDim = Color(0xFF94A3B8);

  static ThemeData get darkTheme {
    return ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: background,
      primaryColor: primary,
      colorScheme: const ColorScheme.dark(
        primary: primary,
        secondary: secondary,
        surface: surface,
        onPrimary: Colors.white,
        onSecondary: background,
      ),
      
      // Typography
      textTheme: GoogleFonts.interTextTheme(
        const TextTheme(
          displayLarge: TextStyle(
            fontSize: 32,
            fontWeight: FontWeight.bold,
            letterSpacing: -1.0,
            color: textMain,
          ),
          displayMedium: TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.w700,
            letterSpacing: -0.5,
            color: textMain,
          ),
          headlineMedium: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.w600,
            color: textMain,
          ),
          bodyLarge: TextStyle(
            fontSize: 16,
            color: textMain,
          ),
          bodyMedium: TextStyle(
            fontSize: 14,
            color: textDim,
          ),
          labelSmall: TextStyle(
            fontFamily: 'JetBrains Mono',
            fontSize: 12,
            letterSpacing: 1.2,
            color: secondary,
          ),
        ),
      ),

      // Card Style
      cardTheme: CardTheme(
        color: surface,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: BorderSide(
            color: primary.withOpacity(0.1),
            width: 1,
          ),
        ),
      ),

      // Input Decoration
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: surface,
        contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide(color: primary.withOpacity(0.2)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: BorderSide(color: primary.withOpacity(0.1)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(16),
          borderSide: const BorderSide(color: primary, width: 2),
        ),
        hintStyle: const TextStyle(color: textDim),
      ),

      // Buttons
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: Colors.white,
          padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
          ),
          elevation: 8,
          shadowColor: primary.withOpacity(0.5),
        ),
      ),
    );
  }
}
